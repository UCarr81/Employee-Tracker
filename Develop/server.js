const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tracker_db',
},
console.log(`Connected to tracker_db database.`)
);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  