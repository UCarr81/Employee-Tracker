# Employee Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to the Employee Tracker – a simple and user-friendly application built using MySQL, Inquirer, and Express. This tool allows you to effortlessly manage your employees, roles, and departments in a database.

## Features

- **Create Employees:** Easily add new employees to the database with relevant details such as role, department, and salary.

- **Flexible Database Management:** Choose from existing departments and salaries or create new ones on the fly.

- **Intuitive User Interface:** The application provides a seamless experience, displaying information in an easy-to-read format with the added touch of text art for clarity.

- **Effortless Deletion:** Remove employees, roles, or departments effortlessly, adapting to changes within your organization.

- **Managerial Hierarchy:** Quickly identify if an employee has a manager, streamlining your understanding of the organizational structure.


## Live Preview
![Live Preview Image](/Develop/images/Preview.png)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
## Installation
Before using this application, you'll need to install the necessary dependencies. To do this, follow these steps: 
later

```
npm i
```
The dependencies are already in a package simply run the line above
## Usage
For Usage run 
```
cd Develop/
mysql -u "your_username" -p < db/schema.sql     "This can be skipped if you don't want to run a seed and want a fresh database"
use etracker_db
source db/seeds.sql    
quit
node server
```
## License 
### This project is licensed under the terms of the 
### The MIT License
[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

## Contributing
If you would like to contribute to this project, please follow the guidelines outlined in the Contributing Guide.

## Questions
If you have questions or need further assistance with this project, please feel free to contact me via:
- E-Mail: CarrilloUriel81@gmail.com
- GitHub: [UCarr81](https://github.com/UCarr81)