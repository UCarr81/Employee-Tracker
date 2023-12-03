const express = require('express');

const mysql = require('mysql12');

const PORT = process.env.PORT || 3001;
const app = express();

app.use (express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',

        password: '',
        database: 'employees_db'
    },
    console.log ('Connected to Employees_db database.')
);
