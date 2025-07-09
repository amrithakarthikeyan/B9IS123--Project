-- Creating Employees table 
CREATE TABLE IF NOT EXISTS "Employees" (
  "Employee_ID" INTEGER PRIMARY KEY,  
  "Name" TEXT NOT NULL,
  "Department" INTEGER,
  "Email" TEXT UNIQUE
);

-- Creating Assets table
CREATE TABLE IF NOT EXISTS "Assets" (
  "Asset-ID" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Asset-Type" TEXT NOT NULL,
  "Brand" TEXT,
  "Model" TEXT,
  "Serial-Number" INTEGER,
  "Purchase_Date" TEXT,
  "Status" TEXT,
  "Employee_ID" INTEGER,
  FOREIGN KEY ("Employee_ID") REFERENCES Employees("Employee_ID")
);

--DELETE FROM Employees;

INSERT INTO Employees ("Employee_ID", "Name", "Department", "Email") VALUES
(4504, 'Aaron Williams', 105, 'mary72@gmail.com'),
(4029, 'Angela Sanchez', 106, 'nancy45@gmail.com'),
(8855, 'Cynthia Cunningham', 103, 'johnwilliams@yahoo.com'),
(2036, 'Kaitlyn Cooper', 105, 'gilbertkathleen@gmail.com'),
(6374, 'Brian Massey', 101, 'kathrynsmith@salazar-jackson.com');
