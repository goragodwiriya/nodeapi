// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');
const bcrypt = require('bcrypt');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({code: 400, message: 'Username and password are required'});
  }

  // Query the database for the user with the provided username
  const sql = 'SELECT * FROM ?? WHERE username = ?';
  pool.query(sql, [process.env.USER_TABLE, username], async (err, result) => {
    if (err) {
      // Respond with 500 Internal Server Error for database errors
      return res.status(500).json({code: 500, message: 'Internal Server Error'});
    } else {
      if (result.length > 0) {
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // User credentials are valid, generate and send an access token
          const userPayload = {username: username, userId: user.id};
          const accessToken = jwt.sign(userPayload, process.env.SECRET_KEY);
          res.json({accessToken});
        } else {
          // Respond with 401 Unauthorized if password is incorrect
          res.status(401).json({code: 401, message: 'Password is incorrect'});
        }
      } else {
        // Respond with 401 Unauthorized if user is not found
        res.status(401).json({code: 401, message: 'Invalid credentials'});
      }
    }
  });
});

module.exports = router;
