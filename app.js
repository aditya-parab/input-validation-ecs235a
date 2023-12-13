const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { body, validationResult } = require('express-validator');
const xss = require('xss');
const sanitizeHtml = require('sanitize-html');

const app = express();
const port = 3001;

// Middleware for sanitizing input fields
const sanitizeInput = [
  body('username').escape().trim(),
  body('password').escape().trim(),
  body('address').customSanitizer((value) => sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })),
];

// Custom insecure parser 
app.use((req, res, next) => {
  let rawData = '';
  req.on('data', (chunk) => {
    rawData += chunk.toString();
  });
  req.on('end', () => {
    // Parse the raw data without proper validation or sanitization
    req.body = parseInsecureData(rawData);
    next();
  });
});

// Function to parse insecure data 
function parseInsecureData(rawData) {
  // Insecure parsing logic (replace with your vulnerable parsing logic)
  return rawData;
}

// Initialize the database with a vulnerable table
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
  db.run('INSERT INTO users (username, password) VALUES ("admin", "admin123")');
});

// Vulnerable login route
app.post(
  '/login',
  sanitizeInput,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Use URLSearchParams to parse the query string
    const params = new URLSearchParams(req.body);

    // Extract the username, password, and address
    const username = params.get('username');
    const password = params.get('password');
    const address = params.get('address');

    // Prevent SQL injection using parameterized query
    db.all(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        if (rows.length > 0) {
          // Prevent XSS by encoding HTML entities before sending to the client
          const safeUsername = xss(username);
          const safeAddress = xss(address);

          res.send(`Login successful \nUsername: ${safeUsername} and Address: ${safeAddress}`);
        } else {
          res.send('Login failed');
        }
      }
    );
  }
);

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

app.get('/kshitij', (req, res) => {
  console.log(req.query.username);
  res.json({ data: req.query.username });
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
