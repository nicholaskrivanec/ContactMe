const dbFile = "./w3s-dynamic-storage/database.db";
const fs = require('fs');
const sqlite = require('better-sqlite3');
const path = require('path');

// Initialize the database
const dbFileExists = fs.existsSync(dbFile);
const db = new sqlite(path.resolve(dbFile), { verbose: console.log });

// Function to set up the database
const dbSetup = () => {
  try {
    console.log("Setting up the database...");
    db.exec(`
      CREATE TABLE IF NOT EXISTS Messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        createdAt INTEGER NOT NULL
      );
    `);
    console.log("Messages table created or already exists.");
  } catch (error) {
    console.error("Error during database setup:", error);
  }
};

// Ensure database schema is created
if (!dbFileExists) {
  console.log("Database file not found. Initializing...");
  dbSetup();
} else {
  console.log("Database file found. Skipping initialization.");
}

// Function to save a message to the database
const saveMessage = async (entry) => {
  let status = false;

  try {
    const { name, email, subject, message } = entry;
    const stmt = db.prepare(`
      INSERT INTO Messages (name, email, subject, message, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(name, email, subject, message, Date.now());
    status = true;
    console.log("Message saved successfully.");
  } catch (error) {
    console.error("Error saving message:", error);
  }
  return status;
};

// Function to fetch messages from the database
const fetchMessages = async (limit = 20) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM Messages
      ORDER BY createdAt DESC
      LIMIT ?
    `);
    return stmt.all(limit);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

module.exports = {
  saveMessage,
  fetchMessages,
};
