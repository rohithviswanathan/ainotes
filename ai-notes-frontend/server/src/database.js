const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      createdAt TEXT NOT NULL
    )
  `);
});

module.exports = db;