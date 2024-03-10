// routes/members.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Middleware for Token Authentication
const authenticateToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  const token = tokenHeader && tokenHeader.split(' ')[1];

  // Check if Token exists
  if (!token) {
    // Respond with 401 Unauthorized if token is missing
    return res.status(401).json({code: 401, message: 'Invalid token'});
  }

  // Verify Token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      // Respond with 403 Forbidden if token is invalid or expired
      return res.status(403).json({code: 403, message: 'Forbidden'});
    }
    req.user = user;
    next();
  });
};

// Middleware for Retrieving Member Data by ID
const getMemberById = (req, res, next) => {
  const memberId = req.params.id;
  const sql = 'SELECT * FROM ?? WHERE id = ?';

  pool.query(sql, [process.env.USER_TABLE, memberId], (err, result) => {
    if (err) {
      // Respond with 500 Internal Server Error for database errors
      return res.status(500).json({code: 500, message: 'Internal Server Error'});
    } else {
      if (result.length > 0) {
        req.member = result[0];
        next();
      } else {
        // Respond with 404 Not Found if member is not found
        return res.status(404).json({code: 404, message: 'Member not found'});
      }
    }
  });
};

// GET /api/members/:id
router.get('/:id', authenticateToken, getMemberById, (req, res) => {
  // Respond with Member Data if found
  res.json({code: 200, payload: req.member});
});

module.exports = router;
