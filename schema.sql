-- Table 1: Employees
CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- Table 2: Assets
CREATE TABLE assets (
    asset_id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    brand TEXT,
    model TEXT,
    serial_number TEXT UNIQUE NOT NULL,
    purchase_date TEXT,
    status TEXT CHECK(status IN ('available', 'assigned', 'damaged', 'retired')) DEFAULT 'available'
);

-- Table 3: Asset Assignments
CREATE TABLE assignments (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    assigned_date TEXT NOT NULL,
    return_date TEXT,
    condition_on_return TEXT,
    FOREIGN KEY (asset_id) REFERENCES assets(asset_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
