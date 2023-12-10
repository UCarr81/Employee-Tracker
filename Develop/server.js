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
    database: 'etracker_db',
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to etracker database.")
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

        "View All Departments",

        "View All Employees",

        "View All Roles",
        
        "Add Departments",

        "Add Employee",

        "Add A Role",

        "Delete Department",

        "Delete Employee",
        
        "Delete Role",

        "End",
      ]
    })
    .then((answers) => {
      const { tasks } = answers;

      if (tasks === 'View All Departments') {
        viewAllDepartments();
      }

      if (tasks === 'View All Employees') {
        viewAllEmployees();
      }

      if (tasks === 'View All Roles'){
        viewAllRoles();
      }
    
      if (tasks === 'Add Departments') {
        addDepartment();
      }

      if (tasks === 'Add Employee') {
        addEmployee();
      }

      if (tasks === 'Add A Role') {
        addRole();
      }

      if (tasks === 'Delete Department') {
        deleteDepartment();
      }

      if (tasks === "Delete Employee") {
        deleteEmployee();
      }

      if (tasks === "Delete Role") {
        deleteRole();
      }

      if (tasks === "End") {
        connection.end();
      }
    });
}
//=============================Views================================
const viewAllEmployees = () => {
  let sql = `
  SELECT
    Employees1.id AS Employee_ID,
    Employees1.first_name AS First_Name,
    Employees1.last_name AS Last_Name,
    Roles1.title AS Role,
    Roles1.salary AS Salary,
    Departments1.name AS Department,
    CONCAT(Manager.first_name, ' ', Manager.last_name) AS Manager
  FROM Employees1
  LEFT JOIN Roles1 ON Employees1.roles_id = Roles1.id
  LEFT JOIN Departments1 ON Roles1.department_id = Departments1.id
  LEFT JOIN Employees1 Manager ON Employees1.manager_id = Manager.id
  `;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching employees:", error);
    } else {
      console.table(results);

      welcomePrompt();
    }
  });
};

const viewAllRoles = () => {
  let sql = `
  SELECT
    Roles1.id AS Role_ID,
    Roles1.title AS Role_Title,
    Roles1.salary AS Salary,
    Departments1.name AS Department
  FROM Roles1
  LEFT JOIN Departments1 ON Roles1.department_id = Departments1.id
  `;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching roles:", error);
    } else {
      console.table(results);

      welcomePrompt();
    }
  });
};

const viewAllDepartments = () => {
  let sql = `
    SELECT
      id AS Department_ID,
      name AS Department_Name
    FROM Departments1
  `;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching departments:", error);
    } else {
      console.table(results);

      welcomePrompt();
    }
  });
};

//=============================Adding================================


const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a valid department name.';
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const { departmentName } = answers;

      let sql = `
        INSERT INTO Departments1 (name)
        VALUES (?)
      `;

      connection.query(sql, [departmentName], (error, results) => {
        if (error) {
          console.error('Error adding department:', error);
        } else {
          console.log(`
          
╭━━━╮╱╱╱╱╱╱╱╱╱╱╭╮╱╱╱╱╱╱╱╱╱╭╮╱   ╭━━━╮╱╭╮╱╭╮╱╱╱╱╭╮
╰╮╭╮┃╱╱╱╱╱╱╱╱╱╭╯╰╮╱╱╱╱╱╱╱╭╯╰╮   ┃╭━╮┃╱┃┃╱┃┃╱╱╱╱┃┃
╱┃┃┃┣━━┳━━┳━━┳┻╮╭╋╮╭┳━━┳━╋╮╭╯   ┃┃╱┃┣━╯┣━╯┣━━┳━╯┃
╱┃┃┃┃┃━┫╭╮┃╭╮┃╭┫┃┃╰╯┃┃━┫╭╮┫┃╱   ┃╰━╯┃╭╮┃╭╮┃┃━┫╭╮┃
╭╯╰╯┃┃━┫╰╯┃╭╮┃┃┃╰┫┃┃┃┃━┫┃┃┃╰╮   ┃╭━╮┃╰╯┃╰╯┃┃━┫╰╯┃
╰━━━┻━━┫╭━┻╯╰┻╯╰━┻┻┻┻━━┻╯╰┻━╯   ╰╯╱╰┻━━┻━━┻━━┻━━╯
╱╱╱╱╱╱╱┃┃
╱╱╱╱╱╱╱╰╯
          `);
          welcomePrompt();
        }
      });
    });
};


const addRole = () => {
  let departmentChoices = [];

  connection.query('SELECT name FROM Departments1', (error, departmentResults) => {
    if (error) {
      console.error('Error fetching departments for choices:', error);
      return;
    }

    departmentChoices = departmentResults.map((department) => department.name);

    // Inquirer prompt for adding a new role
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'Enter the title of the new role:',
          validate: (input) => {
            if (input.trim() === '') {
              return 'Please enter a valid role title.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'Enter the salary for the new role:',
          validate: (input) => !isNaN(+input) || 'Please enter a valid salary (numeric value).',
        },
        {
          type: 'list',
          name: 'roleDepartment',
          message: 'Select the department for the new role:',
          choices: [...departmentChoices, 'Add New Department'],
        },
      ])
      .then((answers) => {
        const { roleTitle, roleSalary, roleDepartment } = answers;

        let sql = `
          INSERT INTO Roles1 (title, salary, department_id)
          VALUES (?, ?, (SELECT id FROM Departments1 WHERE name = ?))
        `;

        connection.query(sql, [roleTitle, roleSalary, roleDepartment], (error, results) => {
          if (error) {
            console.error('Error adding role:', error);
          } else {
            console.log(`
               
╭━━━╮╱╱╭╮╱╱╱╱   ╭━━━╮╱╭╮╱╭╮╱╱╱╱╭╮
┃╭━╮┃╱╱┃┃╱╱╱╱   ┃╭━╮┃╱┃┃╱┃┃╱╱╱╱┃┃
┃╰━╯┣━━┫┃╭━━╮   ┃┃╱┃┣━╯┣━╯┣━━┳━╯┃
┃╭╮╭┫╭╮┃┃┃┃━┫   ┃╰━╯┃╭╮┃╭╮┃┃━┫╭╮┃
┃┃┃╰┫╰╯┃╰┫┃━┫   ┃╭━╮┃╰╯┃╰╯┃┃━┫╰╯┃
╰╯╰━┻━━┻━┻━━╯   ╰╯╱╰┻━━┻━━┻━━┻━━╯
            `);
            welcomePrompt(); 
          }
        });
      });
  });
};




const addEmployee = () => {
  let departmentChoices = [];
  let roleChoices = [];

//---------------Department Choices--------
  connection.query('SELECT name FROM Departments1', (error, departmentResults) => {
    if (error) {
      console.error('Error fetching departments for choices:', error);
      return;
    }

    departmentChoices = departmentResults.map((department) => department.name);

  //--------------Role Choices-------------
    connection.query('SELECT title FROM Roles1', (error, roleResults) => {
      if (error) {
        console.error('Error fetching roles for choices:', error);
        return;
      }

      roleChoices = roleResults.map((role) => role.title);

  //--------------Inquirer-----------------
    inquirer
      .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a valid first name.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Please enter a valid last name.';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'department',
        message: 'Select the department of the employee:',
        choices: [...departmentChoices, 'Add New Department'],
      },
      {
        type: 'input',
        name: 'newDepartment',
        message: 'Enter the name of the new department:',
        when: (answers) => answers.department === 'Add New Department',
      },
      {
        type: 'list',
        name: 'role',
        message: 'Select the role of the employee:',
        choices: [...roleChoices, 'Add New Role'],
      },
      {
        type: 'input',
        name: 'newRole',
        message: 'Enter the title of the new role:',
        when: (answers) => answers.role === 'Add New Role',
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Enter the manager of the employee (N/A for none):',
        choices: async () => await getEmployeeChoices(),
      },
    ])
    .then(async (answers) => {
      const { firstName, lastName, role, newRole, department, manager } = answers;

      const selectedRole = newRole || role;
      const managerID = await getEmployeeId(manager);

      let sql = `
      INSERT INTO Employees1 (first_name, last_name, roles_id, manager_id)
      VALUES (?, ?, (SELECT id FROM Roles1 WHERE title = ?), ?)
    `;
    
    connection.query(sql, [firstName, lastName, selectedRole, managerID], (error, results) => {
      if (error) {
        console.error('Error adding employee:', error);
      } else {
        console.log(`  
        ╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱  ╭━━━╮╱╭╮╱╭╮╱╱╱╱╭╮
        ┃╭━━╯╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱  ┃╭━╮┃╱┃┃╱┃┃╱╱╱╱┃┃
        ┃╰━━┳╮╭┳━━┫┃╭━━┳╮╱╭┳━━┳━━╮  ┃┃╱┃┣━╯┣━╯┣━━┳━╯┃
        ┃╭━━┫╰╯┃╭╮┃┃┃╭╮┃┃╱┃┃┃━┫┃━┫  ┃╰━╯┃╭╮┃╭╮┃┃━┫╭╮┃
        ┃╰━━┫┃┃┃╰╯┃╰┫╰╯┃╰━╯┃┃━┫┃━┫  ┃╭━╮┃╰╯┃╰╯┃┃━┫╰╯┃
        ╰━━━┻┻┻┫╭━┻━┻━━┻━╮╭┻━━┻━━╯  ╰╯╱╰┻━━┻━━┻━━┻━━╯
        ╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╭━╯┃
        ╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╰━━╯
        `);
        welcomePrompt();
      }
    });
    });
  });
});
};

const getEmployeeChoices = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT CONCAT(first_name, " ", last_name) AS Employee FROM Employees1', (error, results) => {
      if (error) {
        console.error('Error fetching employees:', error);
        reject(error);
      } else {
        const employeeChoices = ['None'].concat(results.map((employee) => employee.Employee));
        resolve(employeeChoices);
      }
    });
  });
};

const getEmployeeId = (employeeName) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT id FROM Employees1 WHERE CONCAT(first_name, " ", last_name) = ?',
      [employeeName],
      (error, results) => {
        if (error) {
          console.error('Error fetching employee ID:', error);
          reject(error);
        } else {
          // Assuming the query returns only one result or no result
          const employeeId = results.length > 0 ? results[0].id : null;
          resolve(employeeId);
        }
      }
    );
  });
};


//=============================Delete================================
const deleteDepartment = () => {
  connection.query('SELECT id, name FROM Departments1', (error, results) => {
    if (error) {
      console.error('Error fetching departments for deletion:', error);
      return;
    }

    const departmentChoices = results.map((department) => ({
      name: `${department.name}`,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department you want to delete:',
          choices: departmentChoices,
        },
        {
          type: 'confirm',
          name: 'confirmDelete',
          message: 'Are you sure you want to delete this department?',
          default: false,
        },
      ])
      .then((answers) => {
        const { departmentId, confirmDelete } = answers;

        if (!confirmDelete) {
          console.log('Deletion canceled.');
          welcomePrompt();
          return;
        }

        let sql = `
          DELETE FROM Departments1
          WHERE id = ?
        `;

        connection.query(sql, [departmentId], (error, deleteResult) => {
          if (error) {
            console.error('Error deleting department:', error);
          } else {
            console.log('Department deleted successfully!');
            welcomePrompt();
          }
        });
      });
  });
};