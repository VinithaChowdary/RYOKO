// index.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
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
  const query = 'SELECT DISTINCT place_name FROM Hotels';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching places:', err);
      return res.status(500).json({ error: 'Error fetching places' });
    }
    res.status(200).json({ places: results });
  });
});

const path = require('path');
const filePath = path.join(__dirname, 'lastUser.json');

app.post('/getUser', (req, res) => {
  const { email } = req.body;
  console.log('Received request for email:', email);

  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user data from database:', err);
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    console.log('Database query results:', results);

    if (results.length === 0) {
      console.log('No user found with email:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = results[0];
    console.log('Fetched user data:', userData);

    // Write user data to `latestUser.json`
    console.log('Attempting to write to lastUser.json');
    fs.writeFile(filePath, JSON.stringify(userData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to lastUser.json:', err);
        return res.status(500).json({ error: 'Error writing user data' });
      }
      console.log('User data written to lastUser.json');
      res.json({ message: 'User data saved successfully!', user: userData });
    });
  });
});

app.get("/lastUser", (req, res) => {
  const filePath = path.join(__dirname, "lastUser.json"); // Adjust to match the location of the file
  res.sendFile(filePath);
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
  let query = 'SELECT * FROM Hotels WHERE 1=1';
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

app.post('/bookHotel', (req, res) => {
  const { hotel_name, price } = req.body;

  // Read user data from lastUser.json
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading lastUser.json:', err);
      return res.status(500).json({ error: 'Error reading user data' });
    }

    const user = JSON.parse(data);
    const user_id = user.id;

    // Get hotel_id and place_name from Hotels table
    const hotelQuery = 'SELECT hotel_id, place_name FROM Hotels WHERE hotel_name = ?';
    db.query(hotelQuery, [hotel_name], (err, hotelResults) => {
      if (err) {
        console.error('Error fetching hotel data:', err);
        return res.status(500).json({ error: 'Error fetching hotel data' });
      }

      if (hotelResults.length === 0) {
        console.error('No hotel found with name:', hotel_name);
        return res.status(404).json({ error: 'Hotel not found' });
      }

      const hotel_id = hotelResults[0].hotel_id;
      const place_name = hotelResults[0].place_name;

      // Get place_id from Places table based on place_name
      const placeQuery = 'SELECT place_id FROM Places WHERE place_name = ?';
      db.query(placeQuery, [place_name], (err, placeResults) => {
        if (err) {
          console.error('Error fetching place data:', err);
          return res.status(500).json({ error: 'Error fetching place data' });
        }

        if (placeResults.length === 0) {
          console.error('No place found with name:', place_name);
          return res.status(404).json({ error: 'Place not found' });
        }

        const place_id = placeResults[0].place_id;

        // Insert into hotel_bookings table
        const bookingQuery = 'INSERT INTO hotel_bookings (hotel_id, user_id, place_id, price) VALUES (?, ?, ?, ?)';
        db.query(bookingQuery, [hotel_id, user_id, place_id, price], (err, bookingResult) => {
          if (err) {
            console.error('Error inserting booking data:', err);
            return res.status(500).json({ error: 'Error saving booking data' });
          }

          console.log('Booking saved successfully!');
          res.status(201).json({ message: 'Booking saved successfully!' });
        });
      });
    });
  });
});

app.post('/addTours', (req, res) => {
  const { title, price } = req.body;

  // Read user data from lastUser.json
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading lastUser.json:', err);
      return res.status(500).json({ error: 'Error reading user data' });
    }
    console.log("User data:", data);  // Add this line to check the user object

    const user = JSON.parse(data);
    const user_id = user.id;

    // Insert into tour_bookings table
    const bookingQuery = 'INSERT INTO tours (title, user_id, price) VALUES (?, ?, ?)';
    db.query(bookingQuery, [title, user_id, price], (err, bookingResult) => {
      if (err) {
        console.error('Error inserting booking data:', err);
        return res.status(500).json({ error: 'Error saving booking data' });
      }

      console.log('Tour booking saved successfully!');
      res.status(201).json({ message: 'Tour booking saved successfully!' });
    });
  });
});

app.post('/getFlightPrice', (req, res) => {
  const { source, destination } = req.body;

  const query = `
    SELECT price 
    FROM flights 
    WHERE LOWER(source) = LOWER(?) 
      AND LOWER(destination) = LOWER(?)
  `;

  db.query(query, [source, destination], (err, results) => {
    if (err) {
      console.error('Error fetching flight price:', err);
      return res.status(500).json({ error: 'Error fetching flight price' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No flight found for the selected route' });
    }

    res.json({ price: results[0].price });
  });
});


app.post('/bookFlight', (req, res) => {
  const { source, destination, travelDate, price } = req.body;
  console.log('Request received for booking flight:', { source, destination, travelDate, price });

  // Check for missing data in the request
  if (!source || !destination || !travelDate || !price) {
    console.error('Missing required fields in request:', { source, destination, travelDate, price });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Read user data from lastUser.json
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading lastUser.json:', err);
      return res.status(500).json({ error: 'Error reading user data' });
    }

    let user;
    try {
      user = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing lastUser.json:', parseError);
      return res.status(500).json({ error: 'Invalid user data format' });
    }

    console.log('User data from lastUser.json:', user);

    if (!user || !user.id) {
      console.error('Invalid user data:', user);
      return res.status(400).json({ error: 'Invalid user data' });
    }

    const user_id = user.id;

    // Get flight_id from flights table
    const flightQuery = 'SELECT flight_id FROM flights WHERE LOWER(source) = LOWER(?) AND LOWER(destination) = LOWER(?)';
    db.query(flightQuery, [source, destination], (err, flightResults) => {
      if (err) {
        console.error('Error fetching flight data:', err);
        return res.status(500).json({ error: 'Error fetching flight data' });
      }

      if (flightResults.length === 0) {
        console.error('No flight found with source and destination:', { source, destination });
        return res.status(404).json({ error: 'Flight not found' });
      }

      const flight_id = flightResults[0].flight_id;
      console.log('Found flight_id:', flight_id);

      // Get place_id for source and destination
      const placeQuery = 'SELECT place_id, place_name FROM Places WHERE LOWER(place_name) IN (?, ?)';
      db.query(placeQuery, [source.toLowerCase(), destination.toLowerCase()], (err, placeResults) => {
        if (err) {
          console.error('Error fetching place data:', err);
          return res.status(500).json({ error: 'Error fetching place data' });
        }

        if (placeResults.length < 2) {
          console.error('Place IDs not found for source and destination:', { source, destination });
          return res.status(404).json({ error: 'Place IDs not found for source and destination' });
        }

        let source_place_id, destination_place_id;
        placeResults.forEach((place) => {
          if (place.place_name.toLowerCase() === source.toLowerCase()) {
            source_place_id = place.place_id;
          } else if (place.place_name.toLowerCase() === destination.toLowerCase()) {
            destination_place_id = place.place_id;
          }
        });

        console.log('Resolved place IDs:', { source_place_id, destination_place_id });

        if (!source_place_id || !destination_place_id) {
          console.error('Invalid place IDs for source and destination:', { source_place_id, destination_place_id });
          return res.status(404).json({ error: 'Invalid source or destination' });
        }

        // Insert into flight_bookings table
        const bookingQuery = `
          INSERT INTO flight_bookings (user_id, flight_id, source_place_id, destination_place_id, price, booking_date, travel_date)
          VALUES (?, ?, ?, ?, ?, CURRENT_DATE, ?)
        `;
        db.query(bookingQuery, [user_id, flight_id, source_place_id, destination_place_id, price, travelDate], (err, bookingResult) => {
          if (err) {
            console.error('Error inserting booking data:', err);
            return res.status(500).json({ error: 'Error saving booking data' });
          }

          console.log('Flight booking saved successfully:', bookingResult);
          res.status(201).json({ message: 'Flight booking saved successfully!' });
        });
      });
    });
  });
});



// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});