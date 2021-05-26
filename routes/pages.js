const express = require('express');

const db = require('../config/db');
const router = express.Router();
const controller1 = require('../controllers/cntroller1');
const controller2 = require('../controllers/controller2');
const controller3 = require('../controllers/controller3');
const equip = require('./member');

router.get('/', (req, res) => {
  res.render('sign-up', {
    pageTitle: 'Signup',
  });
});

router.get('/signup', (req, res) => {
  res.render('sign-up',{
    pageTitle:'signup'
  });
});

router.get('/login', (req, res) => {
  res.render('log-in',{
    pageTitle:'login'
  });
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/pricing', (req, res) => {
  res.render('pricing', {
    pageTitle: 'pricing Us',
    price: 'true',
  });
});
router.get('/equipment', equip);

router.get('/home', (req, res) => {
  res.render('index', {
    pageTitle: 'Home Page',
    home: 'true',
  });
});
router.get('/payment', (req, res) => {
  res.render('payment', {
    pageTitle: 'payment Page',
  });
});

router.get('/feedback', async (req, res) => {
  db.query('SELECT * FROM feedback', (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.render('feedback', {
      userData: result,
      pageTitle: 'feedback',
      feedback: 'true',
    });
  });
});

router.post('/feedback', require('./feedback'));

router.get('/', (req, res) => {
  res.render('sign-up', {
    pageTitle: 'Home Page',
  });
});

// router.route('/trainer').post(contsoller1).patch(contsoller2).delete(contsoller3);
router.post('/memAdd', (req, res) => {
  const { name, email, mobileNo } = req.body;

  let sql = 'INSERT INTO users SET ?';

  db.query(
    sql,
    { name: name, email: email, mobileNo: mobileNo },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render('admin', {
          message: 'Added',
        });
      }
    }
  );
});
router.post('/memUpdate', (req, res) => {
  const { name, email, mobileNo } = req.body;

  let sql = `UPDATE users SET ? WHERE email="${email}"`;

  db.query(
    sql,
    { name: name, email: email, mobileNo: mobileNo },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render('admin', {
          message: 'updated',
        });
      }
    }
  );
});
router.post('/memdelete', (req, res) => {
  const { email } = req.body;
  console.log(email);
  let sql = `DELETE FROM users WHERE email="${email}"`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin', {
        message: 'deleted',
      });
    }
  });
});
router.post('/trAdd', (req, res) => {
  const { name, email, mobileNo } = req.body;

  let sql = 'INSERT INTO trainer SET ?';

  db.query(
    sql,
    { name: name, email: email, mobileNo: mobileNo },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render('admin', {
          message: 'Added',
        });
      }
    }
  );
});

router.post('/trupdate', async (req, res) => {
  const { name, email, mobileNo } = req.body;

  let sql = `UPDATE trainer SET ? WHERE email="${email}"`;

  db.query(
    sql,
    { name: name, email: email, mobileNo: mobileNo },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render('admin', {
          message: 'updated',
        });
      }
    }
  );
});

router.post('/trdelete', async (req, res) => {
  const { email } = req.body;
  console.log(email);
  let sql = `DELETE FROM trainer WHERE email="${email}"`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin', {
        message: 'deleted',
      });
    }
  });
});

router.post('/equipAdd', (req, res) => {
  const { name, number } = req.body;

  let sql = 'INSERT INTO equip SET ?';

  db.query(sql, { name: name, number: number }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin', {
        message: 'Added',
      });
    }
  });
});
router.post('/equipupdate', async (req, res) => {
  const { name, number } = req.body;

  let sql = `UPDATE equip SET ? WHERE name="${name}"`;

  db.query(sql, { name: name, number: number }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin', {
        message: 'updated',
      });
    }
  });
});
router.post('/equipdelete', async (req, res) => {
  const { name } = req.body;
  console.log(email);
  let sql = `DELETE FROM equip WHERE email="${name}"`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin', {
        message: 'deleted',
      });
    }
  });
});
router.post('/payment', (req, res) => {
  const { name, email, mobileNo, ifsc, acc, amount } = req.body;

  let sql = 'INSERT INTO payment SET ?';

  db.query(sql, { name: name, email: email, payed: amount }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('payment', {
        message: 'Added',
      });
    }
  });
});

module.exports = router;
