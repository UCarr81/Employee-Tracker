INSERT INTO department (names) VALUES 
('Salesman'),
('Mechanic'),
('Finance Manager'),
('Service Advisor'),
('Parts Specialist');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000.00, 1),
('Sales Representative', 5000.00, 1),
('Mechanic', 60000.00, 2),
('Finance Manager', 75000.00, 3),
('Service Advisor', 55000.00, 4),
('Parts Manager', 60000.00, 5),
('Parts Specialist', 55000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Lexi', 'Andrea', 1, NULL),
('Alan', 'Williams' 1, NULL),
('Kevin', 'Martinez', 1, 1),
('Bob', 'Johnson', 2, Null),
('Darren', 'Derreck', 2, 1),
('Alice', 'Gonzales', 3, NULL),
('Zabdiel', 'Lorenzo', 4, 1),
('Uriel', 'Carrillo', 5, NULL),
('Mack', 'Hagins', 5, 1);
