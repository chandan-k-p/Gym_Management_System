const express = require('express');
const router = express.Router();
const db = require('../config/db');
const server = require('../server');
router.get('/equipment', async (req, res, next) => {
  const sql = 'SELECT * FROM equip';
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.render('equipment', {
        pageTitle: 'equipment list',
        userData: result,
        equipment: 'true',
      });
    }
  });
});

module.exports = router;
