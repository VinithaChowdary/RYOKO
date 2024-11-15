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

// Endpoint to handle adding tours
app.post('/addTour', (req, res) => {
  const { userId, name, title, price, reviews } = req.body;

  // Check if the user exists in the users table
  const userQuery = 'SELECT * FROM users WHERE id = ?'; // Corrected the column name to 'id'
  
  db.query(userQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error checking user data:', err);
      return res.status(500).json({ error: 'Error checking user data' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user exists, insert the tour data into the tours table
    const query = `
      INSERT INTO tours (user_id, user_name, tour_name, price, reviews)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [userId, name, title, price, reviews], (err, result) => {
      if (err) {
        console.error('Error saving tour data:', err);
        res.status(500).json({ error: 'Error saving tour data' });
      } else {
        res.status(201).json({ message: 'Tour data saved successfully!' });
      }
    });
  });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
