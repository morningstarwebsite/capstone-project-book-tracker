// https://openlibrary.org/people/chimaxblessing
import 'dotenv/config';
import express from 'express';
import {
  showHome,
  handleSearch,
  showAddBook,
  handleAddBook,
  showEditBook,
  handleEditBook,
  handleDeleteBook,
  getCatalogBooks,
} from './controllers/bookController.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ── Library routes ────────────────────────────────────────────────────────────
app.get('/',           showHome);
app.get('/search',     handleSearch);

// ── Add book routes ───────────────────────────────────────────────────────────
app.get('/add',        showAddBook);
app.post('/add',       handleAddBook);

// ── Edit / Delete routes ──────────────────────────────────────────────────────
app.get('/edit/:id',   showEditBook);
app.post('/edit/:id',  handleEditBook);
app.post('/delete/:id', handleDeleteBook);

// ── Catalog API (powers the autocomplete search on the Add page) ──────────────
app.get('/api/catalog', getCatalogBooks);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
