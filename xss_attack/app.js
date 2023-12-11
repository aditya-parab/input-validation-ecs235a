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

// Initialize the database with a vulnerable table for username and password
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
  db.run('INSERT INTO users (username, password) VALUES ("admin", "admin123")');
});

// Initialize the database with a vulnerable table for university attended
db.serialize(() => {
  db.run('CREATE TABLE universities (id INTEGER PRIMARY KEY AUTOINCREMENT, university TEXT)');
});

// Vulnerable login route for username and password
app.post('/login', (req, res) => {
  // Use URLSearchParams to parse the query string
  const params = new URLSearchParams(req.body);

  // Extract the username and password
  const username = params.get('username');
  const password = params.get('password');
  res.send(`Username: ${username}, Password: ${password}`);
});

// Vulnerable route for university attended (vulnerable to SQL injection)
app.post('/university', (req, res) => {
  // Use URLSearchParams to parse the query string
  const params = new URLSearchParams(req.body);

  // Extract the university attended
  const university = params.get('university');

  // Vulnerable SQL query (for educational purposes only, do not use in real-world applications)
  db.run(`INSERT INTO universities (university) VALUES ('${university}')`, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.send('University data added successfully');
  });
});

// Handle dumpdata route to simulate an attacker trying to fetch data
app.get('/dumpdata', (req, res) => {
  // Simulate fetching all data from both vulnerable tables
  db.all('SELECT * FROM users', (err, userRows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all('SELECT * FROM universities', (err, universityRows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ users: userRows, universities: universityRows });
    });
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
