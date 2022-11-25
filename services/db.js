const { Client } = require('pg')

const db = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'myFirstDb',
    password: 'admin',
    port: 5432,
  });

  

  db.connect().then((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("MySQL Connected!");
  });
  
  module.exports = db;