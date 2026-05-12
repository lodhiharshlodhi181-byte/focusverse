// Chrome Extension - Content Script

console.log('✅ FocusVerse Content Script Loaded');

// Listen for token from the web app
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === 'FOCUSVERSE_TOKEN') {
    chrome.runtime.sendMessage({ type: 'SAVE_TOKEN', token: event.data.token });
  }
});

// Track scroll speed
let lastScrollTop = 0;
let scrollSpeed = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  scrollSpeed = Math.abs(currentScroll - lastScrollTop);
  lastScrollTop = currentScroll;
});

// Send page info to background
chrome.runtime.sendMessage({
  type: 'PAGE_INFO',
  url: window.location.href,
  title: document.title,
  scrollSpeed: scrollSpeed
});

// Listen for commands from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_TIMER') {
    startFocusTimer(message.limit);
  } else if (message.type === 'SHOW_MONITOR') {
    showMonitorIcon();
  }
});

function startFocusTimer(limitMinutes) {
  let secondsLeft = limitMinutes * 60;
  
  const timerDiv = document.createElement('div');
  timerDiv.id = 'focusverse-timer';
  timerDiv.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 999999;
    background: rgba(0,0,0,0.8); color: #ff0080; padding: 10px 20px;
    border-radius: 15px; border: 2px solid #ff0080; font-family: sans-serif;
    font-weight: bold; box-shadow: 0 0 15px rgba(255,0,128,0.5);
  `;
  document.body.appendChild(timerDiv);

  const interval = setInterval(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    timerDiv.innerText = `⏳ ${mins}:${secs < 10 ? '0' : ''}${secs} left`;
    
    if (secondsLeft <= 0) {
      clearInterval(interval);
      alert('Time is up! FocusVerse is closing this distracting site.');
      chrome.runtime.sendMessage({ type: 'CLOSE_TAB' });
    }
    secondsLeft--;
  }, 1000);
}

function showMonitorIcon() {
  const icon = document.createElement('div');
  icon.innerHTML = '👁️ Monitoring';
  icon.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; z-index: 999999;
    background: rgba(0,0,0,0.7); color: #00d2ff; padding: 5px 15px;
    border-radius: 20px; border: 1px solid #00d2ff; font-size: 12px;
  `;
  document.body.appendChild(icon);
}
