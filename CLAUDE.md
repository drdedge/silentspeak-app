# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SilentSpeak is a mental health support platform that provides anonymous messaging capabilities with facilitator oversight. It's built as a single-page HTML application with embedded JavaScript and CSS.

## Architecture

The application is a self-contained HTML file (`silentspeak_demo.html`) with:
- **Frontend**: Pure HTML/CSS/JavaScript, no build process required
- **State Management**: In-memory JavaScript state object managing messages, queue, and user sessions
- **UI Components**: Tab-based interface separating participant and facilitator views
- **Risk Assessment**: Built-in keyword-based risk evaluation system for message prioritization

## Key Components

### State Management (line 852-860)
Central state object tracks messages, queue, selected topics, current tab, and user/facilitator counts.

### Risk Assessment System (line 875-887)
Automated message risk classification into high/medium/low categories based on keyword detection.

### Anonymous Name Generator (line 863-872)
Generates privacy-preserving usernames combining adjectives, nouns, and random numbers.

### Message Queue System
Priority queue for facilitators to handle urgent or high-risk messages requiring immediate attention.

## Development Commands

Since this is a standalone HTML file, no build process is required:

```bash
# Open the file directly in a browser
open silentspeak_demo.html  # macOS
xdg-open silentspeak_demo.html  # Linux
start silentspeak_demo.html  # Windows

# Or serve with a simple HTTP server
python3 -m http.server 8000
# Then navigate to http://localhost:8000/silentspeak_demo.html
```

## Testing Approach

Manual testing via browser console:
- Test message submission: `sendMessage()`
- Test risk assessment: `assessRisk("test message")`
- Test queue management: `renderQueue()`, `handleQueueItem(id)`
- Test data export: `exportData('csv')` or `exportData('json')`

## Git Workflow

```bash
# Check current status
git status

# Stage changes
git add silentspeak_demo.html

# View changes
git diff --staged

# Commit changes
git commit -m "message"

# Push to GitHub
git push origin main
```

## Important Considerations

- **Privacy-First Design**: All user messages are anonymized with generated names
- **Risk Assessment**: High-risk keywords trigger immediate facilitator alerts
- **Dual Interface**: Separate views for participants (anonymous sharing) and facilitators (moderation/support)
- **No Backend**: Currently demo/prototype - all data is client-side only
- **Export Functionality**: CSV and JSON export capabilities for data analysis