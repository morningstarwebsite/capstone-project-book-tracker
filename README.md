# 📚 Book Tracker — Capstone Project

A full-stack personal library web app where you can track books you have read, write reviews, and manage your reading list.

---

## Features

- **Live book search** — Search the 60-book catalog with an autocomplete dropdown as you type
- **Add books** — Select a book from the catalog and write your personal review
- **Edit reviews** — Update your thoughts on any book at any time
- **Delete books** — Remove a book from your library whenever you like
- **Search your library** — Filter the books you have already added by title
- **Book covers** — Cover images are served automatically from [Open Library](https://openlibrary.org) using the book's ISBN

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express.js |
| Templating | EJS |
| Database | PostgreSQL |
| ORM | Sequelize + Sequelize CLI |
| Styling | Custom CSS |

---

## Project Structure

```
├── controllers/
│   └── bookController.js   # Route handler functions
├── models/
│   ├── index.js            # Sequelize connection + model loader
│   ├── Book.js             # Book catalog model
│   ├── BookLibrary.js      # User library model
│   └── bookModel.js        # Database query functions
├── migrations/             # Sequelize schema migrations
├── seeders/                # 60-book seed data (CSV + Open Library)
├── config/
│   └── config.js           # Sequelize CLI database config
├── views/                  # EJS templates
│   ├── index.ejs           # Home / library view
│   ├── addBook.ejs         # Add book with live search
│   └── editBook.ejs        # Edit review form
├── public/styles/
│   └── main.css            # App stylesheet
└── server.js               # Express app entry point
```

---

## Database Schema

**`books`** — The catalog (60 books seeded from CSV + Open Library)

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| title | STRING | Book title |
| author | STRING | Author name |
| isbn | STRING | Used to fetch the cover image |
| cover_url | STRING | Open Library cover URL |

**`book_library`** — The user's personal library

| Column | Type | Notes |
|---|---|---|
| id | INTEGER | Primary key, auto-increment |
| book_id | INTEGER | Foreign key → books.id |
| review | TEXT | User's personal review |

---

## Getting Started

### 1. Clone and install dependencies
```bash
git clone <your-repo-url>
cd capstone-project-book-tracker
npm install
```

### 2. Set up your environment variables
Create a `.env` file in the project root:
```
PG_USER=your_postgres_user
PG_PASSWORD=your_postgres_password
PG_DATABASE=your_database_name
PG_HOST=localhost
PG_PORT=5432
PORT=3001
```

### 3. Run database migrations and seed data
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 4. Start the app
```bash
# Production
npm start

# Development (auto-restart on file changes)
npm run dev
```

### 5. Open in your browser
```
http://localhost:3001
```

---

## Open Library Profile
[https://openlibrary.org/people/chimaxblessing](https://openlibrary.org/people/chimaxblessing)
