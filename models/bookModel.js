import { Op } from 'sequelize';
import { Book, BookLibrary } from './index.js';

// ── Get every book in the user's library 
export async function getAllBooks() {
  const entries = await BookLibrary.findAll({
    include: [{ model: Book, as: 'book' }],
    order: [['createdAt', 'DESC']],
  });
  return entries.map((e) => ({
    id: e.id,
    title: e.book.title,
    author: e.book.author,
    cover_url: e.book.cover_url,
    review: e.review,
  }));
}

// ── Search the user's library by title 
export async function searchBooks(query) {
  const entries = await BookLibrary.findAll({
    include: [
      {
        model: Book,
        as: 'book',
        where: { title: { [Op.iLike]: `%${query}%` } },
      },
    ],
  });
  return entries.map((e) => ({
    id: e.id,
    title: e.book.title,
    author: e.book.author,
    cover_url: e.book.cover_url,
    review: e.review,
  }));
}

// ── Search the full catalog (powers the autocomplete on the Add page) 
export async function searchCatalog(query) {
  const books = await Book.findAll({
    where: query ? { title: { [Op.iLike]: `%${query}%` } } : {},
    attributes: ['id', 'title', 'author', 'cover_url'],
    order: [['title', 'ASC']],
    limit: 12,
  });
  return books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    cover_url: b.cover_url,
  }));
}

// ── Add a book to the library 
export async function addBook(title, review) {
  const book = await Book.findOne({
    where: { title: { [Op.iLike]: title.trim() } },
  });
  if (!book) {
    return {
      success: false,
      message: `"${title}" was not found in the catalog. Please search and select a title from the list.`,
    };
  }
  const existing = await BookLibrary.findOne({ where: { book_id: book.id } });
  if (existing) {
    return { success: false, message: 'This book is already in your library.' };
  }
  await BookLibrary.create({ book_id: book.id, review: review || null });
  return { success: true };
}

// ── Fetch a library entry for the edit form 
export async function fetchEdit(bookId) {
  const numericId = parseInt(bookId);
  if (isNaN(numericId)) return null;
  const entry = await BookLibrary.findByPk(numericId, {
    include: [{ model: Book, as: 'book' }],
  });
  if (!entry) return null;
  return {
    id: entry.id,
    review: entry.review,
    title: entry.book.title,
    author: entry.book.author,
    cover_url: entry.book.cover_url,
  };
}

// ── Update a review for a book in the library
export async function updateBook(id, review) {
  const numericId = parseInt(id);
  if (isNaN(numericId)) throw new Error('Invalid book ID');
  const entry = await BookLibrary.findByPk(numericId);
  if (!entry) throw new Error('Book not found in library.');
  entry.review = review;
  await entry.save();
  return entry;
}

// ── Delete a book from the library
export async function deleteBook(id) {
  const numericId = parseInt(id);
  if (isNaN(numericId)) throw new Error('Invalid book ID');
  await BookLibrary.destroy({ where: { id: numericId } });
}
