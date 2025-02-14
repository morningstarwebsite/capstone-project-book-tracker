import pg from "pg";
//import dotenv from "dotenv";

//dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booktracker",
  password: "Chimax@123",
  port: 9258,  
});
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection error", err));

export default db;
