-- Set the database to etracker_db
CREATE DATABASE IF NOT EXISTS etracker_db;
USE etracker_db;

-- Create Departments1 table
CREATE TABLE Departments1 (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create Roles1 table
CREATE TABLE Roles1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES Departments1(id)
);

-- Create Employees1 table
CREATE TABLE Employees1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES Roles1(id),
    FOREIGN KEY (manager_id) REFERENCES Employees1(id) ON DELETE SET NULL
);
