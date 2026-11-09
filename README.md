# Sacrament Meeting Planner
Responsive Next.js app for viewing and printing meeting programs.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Checks
```bash
npm run lint
npm run build
```

## Routes
- `/` landing page
- `/meetings` meeting archive
- `/meetings/current` current-Sunday redirect
- `/meetings/1` meeting detail
- `/api/meetings` collection JSON
- `/api/meetings?date=2026-11-08` date-filtered JSON
- `/api/meetings/1` one meeting
- `/api/meetings/abc` expected 400 response

Sample data is in `lib/meetings-db.ts`. It is in-memory and resets when the server restarts. Replace fictional names as appropriate before publishing.
