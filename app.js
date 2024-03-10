// index.js
const express = require('express');
const cors = require('cors');
const membersRoute = require('./routes/members');
const authRoute = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS configuration options
const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 204, // Set the HTTP status for successful CORS preflight requests
  allowedHeaders: 'Content-Type,Authorization', // Allow specified headers
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Use routes for handling member-related API requests
app.use('/api/members', membersRoute);

// Use routes for handling authentication-related API requests
app.use('/api/auth', authRoute);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
