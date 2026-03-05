import {
  getAllBooks,
  searchBooks,
  addBook,
  fetchEdit,
  updateBook,
  deleteBook,
  searchCatalog,
} from '../models/bookModel.js';

// ── GET / — Library home page showing all books in the user's library
export const showHome = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.render('index', { books, message: null });
  } catch (err) {
    console.error('showHome error:', err);
    res.status(500).send('Error loading your library.');
  }
};

// ── GET /search — Search within the library
export const handleSearch = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) {
      return res.render('index', { books: [], message: 'Please enter a search term.' });
    }
    const books = await searchBooks(q);
    const message = books.length === 0 ? 'No books found in your library.' : null;
    res.render('index', { books, message });
  } catch (err) {
    console.error('handleSearch error:', err);
    res.status(500).send('Error searching books.');
  }
};

// ── GET /add — Show the Add Book form 
export const showAddBook = (req, res) => {
  res.render('addBook', { message: null });
};

// ── POST /add — Save book to library 
export const handleAddBook = async (req, res) => {
  const { title, review } = req.body;
  try {
    const result = await addBook(title, review);
    if (!result.success) {
      return res.render('addBook', { message: result.message });
    }
    res.redirect('/');
  } catch (err) {
    console.error('handleAddBook error:', err);
    res.status(500).send('Error adding book.');
  }
};

// ── GET /edit/:id — Show the edit form 
export const showEditBook = async (req, res) => {
  try {
    const book = await fetchEdit(req.params.id);
    if (!book) return res.status(404).send('Book not found.');
    res.render('editBook', { book });
  } catch (err) {
    console.error('showEditBook error:', err);
    res.status(500).send('Error loading edit form.');
  }
};

// ── POST /edit/:id — Save updated review 
export const handleEditBook = async (req, res) => {
  try {
    await updateBook(req.params.id, req.body.review);
    res.redirect('/');
  } catch (err) {
    console.error('handleEditBook error:', err);
    res.status(500).send('Error updating book.');
  }
};

// ── POST /delete/:id — Remove from library 
export const handleDeleteBook = async (req, res) => {
  try {
    await deleteBook(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error('handleDeleteBook error:', err);
    res.status(500).send('Error deleting book.');
  }
};

// ── GET /api/catalog?q= — JSON endpoint powering the Add page autocomplete 
export const getCatalogBooks = async (req, res) => {
  try {
    const q = req.query.q?.trim() || '';
    const books = await searchCatalog(q);
    res.json(books);
  } catch (err) {
    console.error('getCatalogBooks error:', err);
    res.status(500).json({ error: 'Error searching catalog.' });
  }
};
