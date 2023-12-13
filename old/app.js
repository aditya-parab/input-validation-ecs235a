const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;


app.use((req, res, next) => {
  let rawData = '';
  req.on('data', chunk => {
    rawData += chunk.toString();
  });
  req.on('end', () => {
    
    req.body = parseInsecureData(rawData);
    next();
  });
});


function parseInsecureData(rawData) {
  
  return rawData;
}

const db = new sqlite3.Database(':memory:');


db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
  db.run('INSERT INTO users (username, password) VALUES ("admin", "admin123")');
});


app.post('/login', (req, res) => {
 
  const params = new URLSearchParams(req.body);

  
  const username = params.get('username');
  const password = params.get('password');
  const address = params.get('address');

  
  db.all(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    if (rows.length > 0) {
      res.send(`Login successful \nUsername: ${username} and Address: ${address}`);
    } else {
      res.send('Login failed');
    }
  });
  
});


app.get('/dumpdata', (req, res) => {
  
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

//Trying an API call and limiting it 
app.get('/kshitij', (req, res) => {
  console.log(req.query.username);
  res.json({data:  req.query.username});
});


app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});