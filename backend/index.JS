const express = require('express');
const mysql = require('mysql2'); // Use mysql2 instead of mysql
const bodyParser = require('body-parser');
const cors = require('cors');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'vinitha_2004', // Your MySQL password
  database: 'ryoko', // The name of your database
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

// Endpoint to fetch all place names from the hotels table
app.get('/place', (req, res) => {
  const query = 'SELECT place_name FROM hotels GROUP BY place_name ORDER BY place_name ASC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching places:', err);
      return res.status(500).json({ error: 'Error fetching places' });
    }
    const placeNames = results.map((result) => result.place_name);
    res.status(200).json({ places: placeNames });
  });
});

// Endpoint to handle fetching hotels for a specific place
app.post('/getHotels', (req, res) => {
  const { place } = req.body;
  console.log('Received place:', place);

  const query = 'SELECT hotel_name, ratings, stars, price FROM hotels WHERE place_name = ? LIMIT 4';

  db.query(query, [place], (err, results) => {
    if (err) {
      console.error('Error fetching hotels:', err);
      return res.status(500).json({ error: 'Error fetching hotels' });
    }
    console.log('Fetched hotels:', results);
    res.status(200).json({ hotels: results });
  });
});


// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
