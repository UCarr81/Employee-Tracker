DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);