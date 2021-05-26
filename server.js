const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// dotenv.config({ path: './config_new.env' });

const db = require('./config/db');

db.connect((err) => {
  if (err) console.log(err);
  else {
    console.log('mySQL connected');
  }
});

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
