sqlite3 farm.db
 
CREATE TABLE IF NOT EXISTS Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Animal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    animalType TEXT NOT NULL,
    breed INTEGER, -- This will reference the Breed table
    count INTEGER NOT NULL,
    location INTEGER, -- This will reference the Location table
    healthStatus TEXT NOT NULL,
    categoryId INTEGER,
    FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE CASCADE,
    FOREIGN KEY (breed) REFERENCES Breed(id),
    FOREIGN KEY (location) REFERENCES Location(id)
);

CREATE TABLE IF NOT EXISTS Breed (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    -- Removing the animalId foreign key here as it creates a circular dependency.
    -- If you need this, you should model the relationship differently.
);

CREATE TABLE IF NOT EXISTS Location (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    -- Same as Breed, removing animalId foreign key to avoid circular dependency.
);

