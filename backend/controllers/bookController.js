import {
  getAllBooks,
  searchBooks,
  addBook,
  fetchEdit,
  updateBook as updateBookModel,
  deleteBook,
  searchCatalog,
} from '../models/bookModel.js';

// ── GET /api/books ─────────────────────────────────────────────────────────────
export const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    console.error('getBooks error:', err);
    res.status(500).json({ error: 'Error loading your library.' });
  }
};

// ── GET /api/books/search?q= ───────────────────────────────────────────────────
export const searchLibrary = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) return res.json([]);
    const books = await searchBooks(q);
    res.json(books);
  } catch (err) {
    console.error('searchLibrary error:', err);
    res.status(500).json({ error: 'Error searching books.' });
  }
};

// ── GET /api/books/:id ─────────────────────────────────────────────────────────
export const getBook = async (req, res) => {
  try {
    const book = await fetchEdit(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json(book);
  } catch (err) {
    console.error('getBook error:', err);
    res.status(500).json({ error: 'Error loading book.' });
  }
};

// ── POST /api/books ────────────────────────────────────────────────────────────
export const createBook = async (req, res) => {
  const { title, review } = req.body;
  try {
    const result = await addBook(title, review);
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('createBook error:', err);
    res.status(500).json({ error: 'Error adding book.' });
  }
};

// ── PUT /api/books/:id ─────────────────────────────────────────────────────────
export const updateBook = async (req, res) => {
  try {
    await updateBookModel(req.params.id, req.body.review);
    res.json({ success: true });
  } catch (err) {
    console.error('updateBook error:', err);
    res.status(500).json({ error: 'Error updating book.' });
  }
};

// ── DELETE /api/books/:id ──────────────────────────────────────────────────────
export const removeBook = async (req, res) => {
  try {
    await deleteBook(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('removeBook error:', err);
    res.status(500).json({ error: 'Error deleting book.' });
  }
};

// ── GET /api/catalog?q= ────────────────────────────────────────────────────────
export const getCatalog = async (req, res) => {
  try {
    const q = req.query.q?.trim() || '';
    const books = await searchCatalog(q);
    res.json(books);
  } catch (err) {
    console.error('getCatalog error:', err);
    res.status(500).json({ error: 'Error searching catalog.' });
  }
};
