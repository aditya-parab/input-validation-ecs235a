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

// Vulnerable login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vulnerable SQL query (SQL Injection)
  db.all(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    if (rows.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Login failed');
    }
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