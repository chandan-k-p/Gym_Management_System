const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/user', async (req, res, next) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.render('member', {
        pageTitle: 'user list',
        userData: result,
        member: 'true',
      });
    }
  });
});
module.exports = router;
