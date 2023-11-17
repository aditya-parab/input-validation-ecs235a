// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database(':memory:');

// Initialize the database with a vulnerable table
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
  db.run('INSERT INTO users (username, password) VALUES ("admin", "admin123")');
});

// Secure login route using prepared statements
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Secure SQL query using prepared statements
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  stmt.get(username, password, (err, row) => {
    stmt.finalize(); // Finalize the prepared statement

    if (err) {
      return console.error(err.message);
    }

    if (row) {
      res.send('Login successful');
    } else {
      res.send('Login failed');
    }
  });
});

// Handle dumpdata route to simulate an attacker trying to fetch data
app.get('/dumpdata', (req, res) => {
  // Simulate fetching all data from the internal database (for educational purposes only)
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// Serve static files (e.g., index.html) from the root path
app.use(express.static(__dirname));

// Handle root path by serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});