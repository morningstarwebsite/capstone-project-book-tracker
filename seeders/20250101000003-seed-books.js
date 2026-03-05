'use strict';

// Cover images are served by Open Library using the book's ISBN.
// Format: https://covers.openlibrary.org/b/isbn/{ISBN}-M.jpg

const coverUrl = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

const now = new Date();

// ─── 20 books from the original books.csv ─────────────────────────────────────
const csvBooks = [
  { title: 'Little Brother',                                        author: 'Cory Doctorow',          isbn: '9780765319852' },
  { title: 'My Youth Romantic Comedy Is Wrong',                     author: 'Wataru Watari',           isbn: '9781975360344' },
  { title: 'Things Fall Apart',                                     author: 'Chinua Achebe',           isbn: '9780385474542' },
  { title: 'Think and Grow Rich',                                   author: 'Napoleon Hill',           isbn: '1442152656'   },
  { title: "Napoleon Hill's Road to Success",                       author: 'Napoleon Hill',           isbn: '0981951198'   },
  { title: 'Overcoming Barriers to Employment Success Workbook',    author: 'John J. Liptak',          isbn: '9781633320307' },
  { title: 'Inheritance',                                           author: 'Hannie Rayson',           isbn: '9780868197203' },
  { title: 'The Purpose Driven Life',                               author: 'Rick Warren',             isbn: '031080647X'   },
  { title: 'A Diary of Miracles',                                   author: 'Aliss Cresswell',         isbn: '190527839X'   },
  { title: 'Emotionally Healthy Relationships Course Workbook',     author: 'Peter Scazzero',          isbn: '9780310081890' },
  { title: 'Living Virtuously',                                     author: 'Nichole Thomas',          isbn: '0998159700'   },
  { title: 'Great Reset',                                           author: 'Floriana Cerniglia',      isbn: '9781800643512' },
  { title: "Harry Potter and the Sorcerer's Stone",                 author: 'J. K. Rowling',           isbn: '0545790352'   },
  { title: 'The 48 Laws of Power',                                  author: 'Robert Greene',           isbn: '0670881465'   },
  { title: 'Mastery',                                               author: 'Robert Greene',           isbn: '0670024961'   },
  { title: 'College Success',                                       author: 'Amy Baldwin',             isbn: '9781951693169' },
  { title: 'Wings of Fire',                                         author: 'A. P. J. Abdul Kalam',   isbn: '8173711461'   },
  { title: 'Summary of Quiet by Susan Cain',                        author: 'Bookhabits',              isbn: '9781389007521' },
  { title: 'Nineteen Eighty-Four',                                  author: 'George Orwell',           isbn: '0198185219'   },
  { title: 'Rich Dad Poor Dad',                                     author: 'Robert T. Kiyosaki',      isbn: '9781978691681' },
];

// ─── 40 additional books sourced from Open Library ────────────────────────────
const openLibraryBooks = [
  // Classic Literature
  { title: 'To Kill a Mockingbird',                    author: 'Harper Lee',                isbn: '9780061935466' },
  { title: 'The Great Gatsby',                         author: 'F. Scott Fitzgerald',       isbn: '9780743273565' },
  { title: 'The Alchemist',                            author: 'Paulo Coelho',              isbn: '9780062315007' },
  { title: 'Animal Farm',                              author: 'George Orwell',             isbn: '9780451526342' },
  { title: 'Brave New World',                          author: 'Aldous Huxley',             isbn: '9780060929879' },
  { title: 'The Catcher in the Rye',                   author: 'J. D. Salinger',            isbn: '9780316769174' },
  { title: 'Lord of the Flies',                        author: 'William Golding',           isbn: '9780399501487' },
  { title: 'Frankenstein',                             author: 'Mary Shelley',              isbn: '9780141439471' },
  { title: 'The Picture of Dorian Gray',               author: 'Oscar Wilde',               isbn: '9780141439570' },
  { title: 'Crime and Punishment',                     author: 'Fyodor Dostoevsky',         isbn: '9780140449136' },
  { title: 'Pride and Prejudice',                      author: 'Jane Austen',               isbn: '9780141439518' },
  { title: 'The Stranger',                             author: 'Albert Camus',              isbn: '9780679720201' },
  { title: 'Siddhartha',                               author: 'Hermann Hesse',             isbn: '9780553208849' },

  // Fantasy & Sci-Fi
  { title: 'The Hobbit',                               author: 'J. R. R. Tolkien',          isbn: '9780547928227' },
  { title: 'Dune',                                     author: 'Frank Herbert',             isbn: '9780441013593' },
  { title: "Ender's Game",                             author: 'Orson Scott Card',          isbn: '9780765379894' },
  { title: "The Hitchhiker's Guide to the Galaxy",     author: 'Douglas Adams',             isbn: '9780345391803' },
  { title: 'Foundation',                               author: 'Isaac Asimov',              isbn: '9780553293357' },

  // Contemporary Fiction
  { title: 'The Kite Runner',                          author: 'Khaled Hosseini',           isbn: '9781594631931' },
  { title: 'A Thousand Splendid Suns',                 author: 'Khaled Hosseini',           isbn: '9781594483073' },
  { title: 'The Book Thief',                           author: 'Markus Zusak',              isbn: '9780375842207' },
  { title: 'The Hunger Games',                         author: 'Suzanne Collins',           isbn: '9780439023481' },
  { title: 'The Fault in Our Stars',                   author: 'John Green',                isbn: '9780525478812' },
  { title: 'Gone Girl',                                author: 'Gillian Flynn',             isbn: '9780307588364' },
  { title: 'The Girl with the Dragon Tattoo',          author: 'Stieg Larsson',             isbn: '9780307454546' },
  { title: 'One Hundred Years of Solitude',            author: 'Gabriel Garcia Marquez',    isbn: '9780060883287' },
  { title: 'The Da Vinci Code',                        author: 'Dan Brown',                 isbn: '9780307474278' },

  // Non-Fiction & Self-Help
  { title: 'Atomic Habits',                            author: 'James Clear',               isbn: '9780735211292' },
  { title: 'The 7 Habits of Highly Effective People',  author: 'Stephen R. Covey',          isbn: '9780743269513' },
  { title: 'How to Win Friends and Influence People',  author: 'Dale Carnegie',             isbn: '9780671027032' },
  { title: 'The Power of Now',                         author: 'Eckhart Tolle',             isbn: '9781577314806' },
  { title: "Man's Search for Meaning",                 author: 'Viktor E. Frankl',          isbn: '9780807014271' },
  { title: 'Sapiens',                                  author: 'Yuval Noah Harari',         isbn: '9780062316097' },
  { title: 'Thinking, Fast and Slow',                  author: 'Daniel Kahneman',           isbn: '9780374533557' },
  { title: 'Deep Work',                                author: 'Cal Newport',               isbn: '9781455586691' },
  { title: 'The Power of Habit',                       author: 'Charles Duhigg',            isbn: '9780812981605' },
  { title: 'Ikigai',                                   author: 'Hector Garcia',             isbn: '9780143130727' },
  { title: 'The Subtle Art of Not Giving a F*ck',      author: 'Mark Manson',               isbn: '9780062457714' },

  // Philosophy & Classics
  { title: 'Meditations',                              author: 'Marcus Aurelius',           isbn: '9780812968255' },
  { title: 'The Art of War',                           author: 'Sun Tzu',                   isbn: '9781599869773' },
];

const allBooks = [...csvBooks, ...openLibraryBooks].map((book) => ({
  ...book,
  cover_url: coverUrl(book.isbn),
  createdAt: now,
  updatedAt: now,
}));

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('books', allBooks, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('books', null, {});
  },
};
