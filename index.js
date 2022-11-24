const express = require('express')
const { Client } = require('pg')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

const client = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'admin',
  password: 'admin',
  port: 5432,
});


app.use(express.json())

app.get('/', (request, response) => {
    
client.connect().then(() => {
    client.query('SELECT * FROM "users" LIMIT 1000;', (err, res) => {
      if (err) {
          console.error(err);
          return;
      }
    //   console.log(res.rows);
      response.json(res.rows)
      client.end()
    });
  });
    
  })

app.listen(3005, () => {
    console.log(`Server listening on at ${3005}`);
});