
FINAL BUILD (LOGIC + HIGH UI)

Period Logic:
- Reset daily at 5:30 AM IST
- Base period at reset: YYYYMMDD100010000
- Each minute +1 (minuteIndex padded to 4 digits)
- Global same period/result
- Result visible at 30 sec, final at 00 sec
- Last 10 history

Deploy on Render:
- Type: Web Service
- Build: npm install
- Start: node server.js
