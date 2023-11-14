import sqlite3 from 'sqlite3';

const dbPath = './database.db';

const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Successfully connected to the SQLite database.');
  }
});

export default db;
