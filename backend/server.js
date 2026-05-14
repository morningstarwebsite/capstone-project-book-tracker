import 'dotenv/config';
import express from 'express';

import cors from 'cors';
import {
  getBooks,
  searchLibrary,
  getCatalog,
  createBook,
  getBook,
  updateBook,
  removeBook,
} from './controllers/bookController.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Book Tracker API is running' });
});

// ── Library routes ────────────────────────────────────────────────────────────
app.get('/api/books',         getBooks);
app.get('/api/books/search',  searchLibrary);  // must be before /api/books/:id
app.get('/api/books/:id',     getBook);
app.post('/api/books',        createBook);
app.put('/api/books/:id',     updateBook);
app.delete('/api/books/:id',  removeBook);

// ── Catalog API (autocomplete search on the Add page) ─────────────────────────
app.get('/api/catalog',       getCatalog);

// Local dev only — Vercel uses the exported app instead
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
