// index.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'vinitha_2004', // Your MySQL password
  database: 'ryoko' // The name of your database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const app = express();
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request body

// Endpoint to handle sign-up
app.post('/signup', (req, res) => {
  const { name, phone, email } = req.body;

  // SQL query to insert a new user into the database
  const query = 'INSERT INTO users (name, phone, email) VALUES (?, ?, ?)';

  db.query(query, [name, phone, email], (err, result) => {
    if (err) {
      console.error('Error saving user data:', err);
      res.status(500).json({ error: 'Error saving user data' });
    } else {
      res.status(201).json({ message: 'User data saved successfully!' });
    }
  });
});

// Endpoint to fetch all unique place names from the Hotels table
app.get('/place', (req, res) => {
  const query = 'SELECT DISTINCT place_name FROM Hotels'; // Corrected table name

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching places:', err);
      return res.status(500).json({ error: 'Error fetching places' });
    }
    res.status(200).json({ places: results });
  });
});

// Endpoint to handle fetching hotels based on place and price range
app.post('/getHotels', (req, res) => {
  let { place, priceMin, priceMax } = req.body;
  console.log('Received place:', place);
  console.log('Received priceMin:', priceMin);
  console.log('Received priceMax:', priceMax);

  // Parse priceMin and priceMax to numbers
  priceMin = parseFloat(priceMin);
  priceMax = parseFloat(priceMax);
  console.log('Parsed priceMin:', priceMin);
  console.log('Parsed priceMax:', priceMax);

  // Build the SQL query dynamically based on the parameters
  let query = 'SELECT * FROM Hotels WHERE 1=1'; // Corrected table name
  const params = [];

  if (place) {
    query += ' AND LOWER(place_name) = LOWER(?)'; // Case-insensitive comparison
    params.push(place);
  }

  if (!isNaN(priceMin)) {
    query += ' AND price >= ?';
    params.push(priceMin);
  }

  if (!isNaN(priceMax)) {
    query += ' AND price <= ?';
    params.push(priceMax);
  }

  console.log('Executing query:', query);
  console.log('With parameters:', params);

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching hotels:', err);
      return res.status(500).json({ error: 'Error fetching hotels' });
    }
    console.log('Hotels found:', results.length);
    res.json({ hotels: results });
  });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
