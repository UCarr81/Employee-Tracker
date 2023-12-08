-- Insert departments
INSERT INTO Departments1 (name) VALUES
('Service'),
('Sales'),
('Management');

-- Insert roles
INSERT INTO Roles1 (title, salary, department_id) VALUES
('Mechanic', 50000.00, 1),
('Sales Associate', 45000.00, 2),
('Manager', 60000.00, 3);

-- Insert employees without specifying manager_id
INSERT INTO Employees1 (first_name, last_name, roles_id) VALUES
('John', 'Doe', 1),
('Jane', 'Smith', 2),
('Bob', 'Johnson', 1),
('Alice', 'Williams', 2),
('Charlie', 'Brown', 3),
('David', 'Davis', 1),
('Eva', 'Evans', 2),
('Frank', 'Franklin', 3);

-- Update manager_id references
UPDATE Employees1 SET manager_id = 3 WHERE first_name = 'John' AND last_name = 'Doe';
UPDATE Employees1 SET manager_id = 5 WHERE first_name = 'Jane' AND last_name = 'Smith';
UPDATE Employees1 SET manager_id = 3 WHERE first_name = 'Bob' AND last_name = 'Johnson';
UPDATE Employees1 SET manager_id = 5 WHERE first_name = 'Alice' AND last_name = 'Williams';
UPDATE Employees1 SET manager_id = 6 WHERE first_name = 'David' AND last_name = 'Davis';
UPDATE Employees1 SET manager_id = 6 WHERE first_name = 'Eva' AND last_name = 'Evans';

-- Now all employees have their managers specified
