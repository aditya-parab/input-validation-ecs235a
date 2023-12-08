// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

// Custom insecure parser (for educational purposes only)
app.use((req, res, next) => {
  let rawData = '';
  req.on('data', chunk => {
    rawData += chunk.toString();
  });
  req.on('end', () => {
    // Parse the raw data without proper validation or sanitization
    req.body = parseInsecureData(rawData);
    next();
  });
});

// Function to parse insecure data (for educational purposes only)
function parseInsecureData(rawData) {
  // Insecure parsing logic (replace with your vulnerable parsing logic)
  return rawData;
}

const db = new sqlite3.Database(':memory:');

// Initialize the database with a vulnerable table
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
  db.run('INSERT INTO users (username, password) VALUES ("admin", "admin123")');
});

// Vulnerable login route
app.post('/login', (req, res) => {
  // Use URLSearchParams to parse the query string
  const params = new URLSearchParams(req.body);

  // Extract the username and password
  const username = params.get('username');
  const password = params.get('password');
  res.send(username);
});

// Handle dumpdata route to simulate an attacker trying to fetch data
app.get('/dumpdata', (req, res) => {
  // Simulate fetching all data from the internal database 
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
