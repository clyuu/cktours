# C&K Tours Website

This repository contains the frontend site and optional review API service.

## Run Locally

**Prerequisites:** Node.js


1. Install dependencies:
   `npm install`
2. (Optional) Set `GEMINI_API_KEY` in [.env.local](.env.local) for the AI travel assistant feature
3. Run app + SQLite review API together:
   `npm run dev:all`

## Tour Reviews (SQLite)

- Review API server: `backend/server.js`
- SQLite DB file: `data/feedback.db`
- API endpoints:
  - `GET /api/reviews?tourId=<tour-id>`
  - `POST /api/reviews`

If you only run `npm run dev`, reviews will not load because the API server is not started.

## Make Reviews Work On GitHub Pages

For small traffic projects, you can use JSONBin to share reviews across all visitors without running a backend server.

### 1. Configure JSONBin

Create a `.env.local` file and add:

- `VITE_JSONBIN_BIN_ID=<your_bin_id>`
- `VITE_JSONBIN_API_KEY=<your_jsonbin_key>`
- `VITE_JSONBIN_ACCESS_KEY=<optional_access_key>`

If JSONBin values are not set (or JSONBin is temporarily unavailable), the app automatically falls back to local device storage so users can still submit reviews.

### 2. Build and Deploy

- `npm run build`
- `npm run deploy`

## Optional Backend Mode (Express + SQLite)

If you prefer full backend control, keep using the existing Express + SQLite API deployment flow.

### 1. Deploy Backend API (Express + SQLite)

You can deploy `backend/server.js` to a Node host such as Render, Railway, or Fly.io.

Required backend environment variables:

- `PORT` (provided by host automatically)
- `CORS_ORIGIN` (comma separated allowed origins)
   - Example: `https://clyuu.github.io`
- `SQLITE_DB_PATH` (persistent disk path for SQLite file)
   - Example on Render disk: `/var/data/feedback.db`

After deploy, confirm API is live:

- `https://your-api-domain/api/health`

### 2. Configure Frontend For Production API

Create a `.env.local` in the frontend project and set:

- `VITE_API_BASE_URL=https://your-api-domain`

Then build and deploy:

- `npm run build`
- `npm run deploy`

### 3. Keep Local Development Working

For local development you can keep `VITE_API_BASE_URL` empty and run:

- `npm run dev:all`

In that case Vite proxy continues to use local `/api` routes.
