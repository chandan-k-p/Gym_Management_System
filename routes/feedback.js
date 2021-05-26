const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/feedback', async (req, res) => {
  const { fname, femail, freview } = req.body;
  console.log(req.body);
  const sql = 'INSERT INTO feedback SET ?';
  db.query(
    sql,
    { name: fname, email: femail, review: freview },
    (err, result) => {
      if (err) console.log(err);
      res.render('feedback', {
        message: 'Review Sent Sucessfully',
        feedback: 'true',
      });
    }
  );
});

module.exports = router;
