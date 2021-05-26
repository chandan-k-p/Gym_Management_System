const express = require('express');
const router = express.Router();
const db = require('../config/db');
const server = require('../server');
router.get('/trainer', async (req, res, next) => {
  const sql = 'SELECT * FROM trainer';
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.render('trainer', {
        pageTitle: 'trainer list',
        userData: result,
        trainer: 'true',
      });
    }
  });
});

module.exports = router;
