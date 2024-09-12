
import * as SQLite from 'expo-sqlite';

// Open a database connection
const db = SQLite.openDatabaseAsync('farm.db')



// Function to initialize the database and create tables
const initializeDatabase = () => {
  db.runAsync(
      `CREATE TABLE IF NOT EXISTS Category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL
      );`);

    // Create Breed table
    db.runAsync(
      `CREATE TABLE IF NOT EXISTS Breed (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );`);

    // Create Location table
    db.runAsync(
      `CREATE TABLE IF NOT EXISTS Location (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );`);

    // Create Animal table
    db.runAsync(
      `CREATE TABLE IF NOT EXISTS Animal (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animalType TEXT NOT NULL,
        breed INTEGER,
        count INTEGER NOT NULL,
        location INTEGER,
        healthStatus TEXT NOT NULL,
        categoryId INTEGER,
        FOREIGN KEY (categoryId) REFERENCES Category(id),
        FOREIGN KEY (breed) REFERENCES Breed(id),
        FOREIGN KEY (location) REFERENCES Location(id)
      );`);
  };

// Export the initialize function
export default initializeDatabase;
