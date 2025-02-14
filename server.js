
//Your URL: https://openlibrary.org/people/chimaxblessing

import express from "express";
import bodyParser from "body-parser";
import { getAllBooks, searchBooks, addBook,fetchEdit, updateBook, deleteBook } from "./models/bookModel.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 🟢 Home Route - Show Books
app.get("/", async (req, res) => {
    try {
        const books = await getAllBooks();
        res.render("index.ejs", { books , message: null });
    } catch (err) {
        res.status(500).send("Error loading books.");
    }
});

// 🔍 Search Books
app.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.q;
        console.log("Search Query:", searchQuery); // Debugging
        if (!searchQuery) {
            return res.render("index.ejs", { books: [], message: "Please enter a search term." });
        }
        const results = await searchBooks(searchQuery);
        console.log("Search results:",results);

        if (results.length === 0) {
            return res.render("index.ejs", { books: [], message: "No books found." });
        }
    
        res.render("index.ejs", { books: results, message: null });
    } catch (err) {
        res.status(500).send("Error searching books.");
    }
});

// ➕ Add Book
app.get("/add", (req, res) => {
    res.render("addBook.ejs"); 
});

app.post("/add", async (req, res) => {
    const { title, review } = req.body;

    try {
       const result = await addBook(title, review);
       console.log("Result from addBook:", result);  // Log the result
       if (!result.success) {
        return res.status(400).send(result.message);
         }
        res.redirect("/");
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send("Error adding book.");
    } 
});

// ✏️ Edit Book
app.get("/edit/:id", async (req, res) => {
    const bookId = req.params.id;
    try {
        console.log("Book ID:", bookId);
        const result = await fetchEdit(bookId)
        console.log("Result from database:", result);
        if (!result || result.rows.length === 0) {
          return res.status(404).send("Book not found");
          }
          const book = result.rows[0];

          console.log("Fetched cover URL:", book.cover_url);
          console.log("Fetched book:", book);

      res.render("editBook.ejs", { book });
    } catch (err) {
        console.error("Error fetching book for edit:", err);
      res.status(500).send("Server error");
    }
  });
  
app.post("/edit/:id", async (req, res) => {
    const { review} = req.body;
    const bookId = req.params.id;
    
    console.log("Received book ID:", bookId);
    try {
        await updateBook(bookId,review);
        res.redirect("/");
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Error updating book.");
    }
});

// 🗑️ Delete Book
app.post("/delete/:id", async (req, res) => {
    try {
        await deleteBook(req.params.id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error deleting book.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


