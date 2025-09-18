# User Analytics Dashboard

A React (Vite) app that builds a dashboard and a user list using the MockAPI endpoint:

```
https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users
```

## Features

- Dashboard KPIs and charts
  - Total Users tile
  - Users Created Per Day (last 30 days)
  - Avatar Distribution (with/without profile picture)
  - Signup Time of Day distribution
  - Recently Joined (top 5)
- Users page
  - In-memory pagination (10 per page)
  - Sorting (name/date)
  - Search (name/email)
  - Clickable row → modal with details

## Tech

- React + Vite
- TailwindCSS
- Recharts
- React Router

## Setup

```bash
npm install
npm run dev
```

If Tailwind IntelliSense complains, make sure you're using Node 18+.
