// Chrome Extension - Background Service Worker

let currentTab = null;
let startTime = null;
let pulseTimer = null;

// Track tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await stopPulse();
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url.startsWith('http')) {
    currentTab = tab;
    startTime = Date.now();
    startPulse();
  }
});

// Track window focus
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    await stopPulse();
  } else {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url.startsWith('http')) {
      currentTab = tab;
      startTime = Date.now();
      startPulse();
    }
  }
});

// Pulse every 30 seconds to record screen time
function startPulse() {
  if (pulseTimer) return;
  pulseTimer = setInterval(async () => {
    if (currentTab && startTime) {
      const timeSpent = 30; // 30 seconds pulse
      await recordActivity(currentTab, timeSpent);
      startTime = Date.now(); // Reset start time for next pulse
    }
  }, 30000);
}

async function stopPulse() {
  if (pulseTimer) {
    clearInterval(pulseTimer);
    pulseTimer = null;
  }
  if (currentTab && startTime) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    if (timeSpent > 1) await recordActivity(currentTab, timeSpent);
  }
  currentTab = null;
  startTime = null;
}

let blockedSites = [];

// Fetch blocked sites from server
async function updateBlockedSites() {
  try {
    const token = await chrome.storage.local.get(['token']);
    if (!token.token) return;
    
    const res = await fetch('http://localhost:5000/api/blocker', {
      headers: { 'Authorization': `Bearer ${token.token}` }
    });
    const data = await res.json();
    if (data.success) {
      blockedSites = data.sites;
      console.log('✅ Updated blocked sites:', blockedSites.length);
    }
  } catch (err) {
    console.error('Error fetching blocked sites:', err);
  }
}

// Initial fetch and set interval
updateBlockedSites();
setInterval(updateBlockedSites, 30000); // Check every 30s

async function recordActivity(tab, timeSpent, scrollSpeed = 0) {
  try {
    // Check if site is blocked
    const urlHostname = new URL(tab.url).hostname;
    const siteConfig = blockedSites.find(s => urlHostname.includes(s.url));
    
    if (siteConfig && siteConfig.mode === 'blocked') {
       // Should already be blocked by tab listener, but safe check
       return;
    }

    const response = await fetch('http://localhost:8000/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: tab.url,
        title: tab.title,
        time_spent: timeSpent,
        scroll_speed: scrollSpeed
      })
    });

    const data = await response.json();
    const tokenData = await chrome.storage.local.get(['token']);

    if (tokenData.token) {
      await fetch('http://localhost:5000/api/stats/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData.token}`
        },
        body: JSON.stringify({
          website: urlHostname,
          category: data.category,
          timeSpent: timeSpent,
          scrollSpeed: scrollSpeed,
          impact: data.health_impact
        })
      });
    }
  } catch (error) {
    console.error('Error tracking screen time:', error);
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PAGE_INFO') {
    const tabId = sender.tab.id;
    const urlHostname = new URL(message.url).hostname.toLowerCase();
    const siteConfig = blockedSites.find(s => urlHostname.includes(s.url.toLowerCase()));

    if (siteConfig) {
      if (siteConfig.mode === 'blocked') {
        chrome.tabs.remove(tabId);
      } else if (siteConfig.mode === 'timer') {
        chrome.tabs.sendMessage(tabId, { type: 'START_TIMER', limit: siteConfig.timeLimit });
      } else if (siteConfig.mode === 'monitored') {
        chrome.tabs.sendMessage(tabId, { type: 'SHOW_MONITOR' });
      }
    }
  } else if (message.type === 'CLOSE_TAB') {
    chrome.tabs.remove(sender.tab.id);
  } else if (message.type === 'SAVE_TOKEN') {
    chrome.storage.local.set({ token: message.token }, () => {
      console.log('✅ Token synced from web app');
      updateBlockedSites(); // Refresh sites immediately
    });
  }
});

chrome.idle.onStateChanged.addListener((state) => {
  if (state !== 'active') stopPulse();
});

console.log('✅ FocusVerse Extension Background Worker Started');
