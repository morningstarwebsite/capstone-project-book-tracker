
import db from "./db.js";

// 🟢 Get All Books (Joined with Book Library)
export async function getAllBooks() {
    const result = await db.query(
        `SELECT book_librarys.id, books.title, books.author, books.cover_url, book_librarys.review
         FROM books
         JOIN book_librarys ON books.title = book_librarys.title_id`
    );
    return result.rows;
}

// 🔍 Search Books
export async function searchBooks(searchQuery) {
  try { 
    const result = await db.query(
        `SELECT * FROM books  WHERE LOWER(title) ILIKE $1 `,
        [`%${searchQuery}%`]
    );
    if (result.rows.length === 0) {
      console.log("No books found."); // Debugging
      return []; // Return empty array if no books found
    }
    console.log("Database Query Result:", result.rows); // Debugging
    return result.rows;
    } catch (err) {
      console.error("Error searching books:", err);
      return []; // Return empty array if an error occurs
  }
}

// ➕ Add Book
export async function addBook(title, review) { 
  try {    
    const result = await db.query(
      "SELECT title, author, cover_url FROM books WHERE LOWER(title) = LOWER($1)",
      [title.trim()]
    );
    console.log("🔍 Query Result:", result.rows); // 🔹 Log to check what’s returned

    if (result.rows.length === 0) {
      console.log("Book not found in books table.");
      return { success: false, message: "Book not found in database" };
    }
  
    const data = result.rows[0];
    const titleId = data.title;
    const authorId = data.author;
    const cover_url = data.cover_url;
    // Check if the book already exists in book_librarys
    const checkLibrary = await db.query(
      "SELECT * FROM book_librarys WHERE title_id = $1",
      [titleId]
    );

    if (checkLibrary.rows.length > 0) {
      return { success: false, message: "This book is already in your library." };
    }
    try {
      await db.query(
        "INSERT INTO book_librarys (title_id, author_id, review, cover_url) VALUES ($1, $2, $3,$4) ",
        [titleId, authorId,review,cover_url]
      );

    console.log("Book added to book_librarys.");
    return { success: true , cover_url : cover_url};

    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "Database error" };
  }
};



// ✏️ Update Book
export async function fetchEdit(bookId) {
  
  const result = await db.query(
    `SELECT book_librarys.id, book_librarys.review, book_librarys.title_id, book_librarys.author_id, books.title, books.cover_url
     FROM book_librarys 
     JOIN books ON book_librarys.title_id = books.title
     WHERE book_librarys.id = $1`,
    [bookId]
  );
  
  return result;
}
export async function updateBook(id,review,) {
   
    const numericId = parseInt(id); // Ensure ID is an integer
    if (isNaN(numericId)) {
        console.error("Invalid book ID:", id);
        throw new Error("Invalid book ID");
    }
    try {

       // Check if book exists
       const checkResult = await db.query(`SELECT * FROM book_librarys WHERE id = $1`, [numericId]);
       if (checkResult.rowCount === 0) {
           console.warn("Book ID does not exist:", numericId);
           throw new Error("Book ID does not exist.");
       }
      const queryString = `
          UPDATE book_librarys
          SET review = $1
          WHERE id = $2
      `;
      const values = [review,numericId ];

      // Log the query for debugging
      console.log("Executing query:", queryString);
      console.log("With values:", values);

      const result = await db.query(queryString, values); // Execute the query to update the review
      console.log("Update result:", result);
      if (result.rowCount === 0) {
        console.warn("No rows updated. Book ID may not exist.");
    }
    return result;
  } catch (err) {
      console.error("Error updating review:", err);
      throw new Error("Failed to update review.");
  }
}

// 🗑️ Delete Book
export async function deleteBook(id) {
    await db.query(`DELETE FROM book_librarys WHERE id=$1`, [id]);
};

 




