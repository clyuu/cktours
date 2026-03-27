import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const PORT = process.env.PORT || 4000;

const configuredDbPath = String(process.env.SQLITE_DB_PATH || '').trim();
const dbPath = configuredDbPath
  ? path.resolve(configuredDbPath)
  : path.join(process.cwd(), 'data', 'feedback.db');

const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.prepare(
  `CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tour_id TEXT NOT NULL,
    tour_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    visited_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`
).run();

const configuredCorsOrigins = String(process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors(
    configuredCorsOrigins.length
      ? {
          origin: (origin, callback) => {
            if (!origin || configuredCorsOrigins.includes(origin)) {
              callback(null, true);
              return;
            }
            callback(new Error('Not allowed by CORS'));
          },
        }
      : undefined
  )
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/reviews', (req, res) => {
  const tourId = String(req.query.tourId || '').trim();

  const rows = tourId
    ? db
        .prepare(
          `SELECT
            id,
            tour_id AS tourId,
            tour_name AS tourName,
            customer_name AS customerName,
            rating,
            comment,
            visited_at AS visitedAt,
            created_at AS createdAt
          FROM reviews
          WHERE tour_id = ?
          ORDER BY id DESC`
        )
        .all(tourId)
    : db
        .prepare(
          `SELECT
            id,
            tour_id AS tourId,
            tour_name AS tourName,
            customer_name AS customerName,
            rating,
            comment,
            visited_at AS visitedAt,
            created_at AS createdAt
          FROM reviews
          ORDER BY id DESC`
        )
        .all();

  return res.json(rows);
});

app.post('/api/reviews', (req, res) => {
  const payload = req.body ?? {};
  const tourId = String(payload.tourId || '').trim();
  const tourName = String(payload.tourName || '').trim();
  const customerName = String(payload.customerName || '').trim();
  const comment = String(payload.comment || '').trim();
  const visitedAtRaw = String(payload.visitedAt || '').trim();
  const rating = Number(payload.rating);

  if (!tourId || !tourName || !customerName || !comment) {
    return res.status(400).json({ error: 'tourId, tourName, customerName, and comment are required' });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'rating must be an integer between 1 and 5' });
  }

  if (comment.length < 5) {
    return res.status(400).json({ error: 'comment must be at least 5 characters' });
  }

  const visitedAt = visitedAtRaw || null;

  const insert = db.prepare(
    `INSERT INTO reviews (tour_id, tour_name, customer_name, rating, comment, visited_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  const result = insert.run(tourId, tourName, customerName, rating, comment, visitedAt);

  const createdReview = db
    .prepare(
      `SELECT
        id,
        tour_id AS tourId,
        tour_name AS tourName,
        customer_name AS customerName,
        rating,
        comment,
        visited_at AS visitedAt,
        created_at AS createdAt
       FROM reviews
       WHERE id = ?`
    )
    .get(result.lastInsertRowid);

  return res.status(201).json(createdReview);
});

app.listen(PORT, () => {
  console.log(`Review API running on http://localhost:${PORT}`);
  console.log(`SQLite database: ${dbPath}`);
});
