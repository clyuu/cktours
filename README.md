<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1bI9dt16QKN6NEzRbjwGQo0dfi5YIBQNj

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
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

GitHub Pages can host the frontend only. To keep review save/load working in production, host the API separately and point the frontend to that API.

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
