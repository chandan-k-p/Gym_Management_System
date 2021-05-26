const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.render('log-in', {
        message: 'please  submit email and password',
      });
    }
    if (email == 'weengineers3@gmail.com' && password == '123') {
      return res.redirect('/admin');
    }

    db.query(
      'SELECT * FROM users where email=?',
      [email],
      async (err, results) => {
        if (err) console.log(err);
        if (!results || (await (results[0].password != password))) {
          res.render('log-in', {
            message: 'email or password is incorrect',
          });
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log(token);
          const cookieOption = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 60
            ),
            httpOnly: true,
          };
          res.cookie('jwt', token, cookieOption);
          res.render('index', {
            pageTitle: 'home',
            home: 'true',
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.register = (req, res) => {
  console.log(req.body);
  const { name, name2, email, phnumber, password, confirmPassword } = req.body;

  db.query(
    'SELECT email FROM users  WHERE email=?',
    [email],
    async (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length > 0) {
        return res.render('sign-up', {
          message: 'email id is already in use',
        });
      } else if (password !== confirmPassword) {
        return res.render('sign-up', {
          message: 'password doesnot match',
        });
      }

      db.query(
        'INSERT INTO users SET ?',
        { name: name, email: email, mobileNo: phnumber, password: password },
        (err) => {
          if (err) console.log(err);
          else {
            res.render('index', {
              pageTitle: 'Home page',
            });
          }
        }
      );
    }
  );
};
