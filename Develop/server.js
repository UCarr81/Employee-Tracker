const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table')
require('dotenv').config();

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'tracker_db',
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to tracker_db database.")
  console.log(`
  
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████──────────██████─██████████████─██████─────────██████████████─██████████████─██████████████████████─██████████████─
─██░░██──────────██░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██──────────██░░██─██░░██████████─██░░██─────────██░░██████████─██░░██████░░██─██░░██████░░██████░░██─██░░██████████─
─██░░██──────────██░░██─██░░██─────────██░░██─────────██░░██─────────██░░██──██░░██─██░░██████░░██████░░██─██░░██─────────
─██░░██──██████──██░░██─██░░██████████─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─██░░██████████─
─██░░██──██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─
─██░░██──██░░██──██░░██─██░░██████████─██░░██─────────██░░██─────────██░░██──██░░██─██░░██──██████──██░░██─██░░██████████─
─██░░██████░░██████░░██─██░░██─────────██░░██─────────██░░██─────────██░░██──██░░██─██░░██──────────██░░██─██░░██─────────
─██░░██████░░██████░░██─██░░██████████─██░░██████████─██░░██████████─██░░██████░░██─██░░██──────────██░░██─██░░██████████─
─██░░░░░░░░░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──────────██░░██─██░░░░░░░░░░██─
─██████████████████████─██████████████─██████████████─██████████████─██████████████─██████──────────██████─██████████████─
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
`);

  welcomePrompt();
});

function welcomePrompt() {
/*I am presented with the following options: 
view all departments,
view all roles,
view all employees,
add a department, 
add a role, 
add an employee,
update an employee role*/
  inquirer
    .prompt({
      type: "list",
      name: 'tasks',
      //This is probably pushing to hard we'll see if this stays or not
      message: 'What would you like to do?',
      choices: [
        "View All Employees",

        "Add Employee",

        "View All Roles",

        "Add A Role",

        "View All Departments",

        "Add Departments",

        "End",
      ]
    })
    .then((answers) => {
      const { tasks } = answers;

      if (tasks === 'View All Employees') {
        viewAllEmployees();
      }

      if (tasks === "End") {
        connection.end();
      }
    });
}

const viewAllEmployees = () => {
  let sql = `
  SELECT
    employees.id AS Employee_ID,
    employees.first_name AS First_Name,
    employees.last_name AS Last_Name,
    roles.title AS Role,
    roles.salary AS Salary,
    department.name AS Department,
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
  FROM employees
  LEFT JOIN roles ON employees.roles_id = roles.id
  LEFT JOIN department ON roles.department_id = department.id
  LEFT JOIN employees manager ON employees.manager_id = manager.id
  `;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching employees:", error);
    } else {
      // Display the results using console.table
      console.table(results);

      // After displaying, you might want to go back to the main menu
      welcomePrompt();
    }
  });
};
