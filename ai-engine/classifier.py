import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Productivity categories
PRODUCTIVE_KEYWORDS = [
    'github', 'stackoverflow', 'leetcode', 'coursera', 'udemy',
    'medium', 'dev.to', 'documentation', 'vscode', 'notion',
    'ds', 'algorithm', 'programming', 'coding', 'javascript',
    'python', 'react', 'node', 'database', 'api', 'learning', 'education'
]

NON_PRODUCTIVE_KEYWORDS = [
    'instagram', 'tiktok', 'youtube', 'facebook', 'twitter',
    'reddit', 'twitch', 'netflix', 'meme', 'reels', 'shorts',
    'gaming', 'porn', 'adult', 'scrolling'
]

class ActivityLog(BaseModel):
    url: str
    title: Optional[str] = ""
    time_spent: int = 0
    scroll_speed: float = 0.0  # Pixels per second
    is_video: bool = False

def classify_activity(activity: ActivityLog) -> str:
    """Classify activity as productive, non-productive, or mindless"""
    url_lower = activity.url.lower()
    title_lower = activity.title.lower()
    
    # NEW: Detect Mindless Consumption based on high scroll speed in non-productive sites
    if activity.scroll_speed > 1500: # Threshold for very fast scrolling
        for keyword in ['reels', 'shorts', 'tiktok', 'instagram', 'facebook']:
            if keyword in url_lower or keyword in title_lower:
                return "mindless-consumption"

    # Check non-productive
    for keyword in NON_PRODUCTIVE_KEYWORDS:
        if keyword in url_lower or keyword in title_lower:
            return "non-productive"
    
    # Check productive
    for keyword in PRODUCTIVE_KEYWORDS:
        if keyword in url_lower or keyword in title_lower:
            return "productive"
    
    return "neutral"

@app.post("/classify")
async def classify_website(activity: ActivityLog):
    """Classify a website activity and calculate impact"""
    category = classify_activity(activity)
    
    # Calculate impact
    xp_earned = 0
    health_impact = 0
    
    if category == "productive":
        xp_earned = (activity.time_spent // 60) * 15
        health_impact = 2
    elif category == "mindless-consumption":
        xp_earned = -10 # Penalty for dopamine scrolling
        health_impact = -5
    elif category == "non-productive":
        xp_earned = 0
        health_impact = -1

    return {
        "url": activity.url,
        "category": category,
        "time_spent": activity.time_spent,
        "xp_earned": xp_earned,
        "health_impact": health_impact,
        "intervention_required": category == "mindless-consumption"
    }

@app.get("/health")
async def health():
    return {"status": "✅ AI Engine evolved with Scrolling Detection"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
