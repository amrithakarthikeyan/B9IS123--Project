const express = require('express');

const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

const cors = require('cors');

app.use(cors());

app.use(express.json());

const db = new sqlite3.Database('./database.db');
//db.run (`DROP TABLE assets`);
db.run(`CREATE TABLE IF NOT EXISTS assets (
  "Asset-ID" INTEGER PRIMARY KEY NOT NULL,
  "Asset-Type" TEXT NOT NULL,
  "Brand" TEXT NOT NULL,
  "Model" TEXT NOT NULL,
  "Serial-Number" INTEGER NOT NULL UNIQUE,
  "Purchase_Date" TEXT,
  "Status" TEXT,
  "Employee_ID" INTEGER,
  FOREIGN KEY ("Employee_ID") REFERENCES employees("Employee_ID")
)`);

//db.run (`DROP TABLE employees`);
db.run(`CREATE TABLE IF NOT EXISTS "employees" (
  "Employee_ID" INTEGER PRIMARY KEY NOT NULL,
  "Name" TEXT NOT NULL,
  "Department" INTEGER,
  "Email" TEXT UNIQUE
)`);

app.get('/', (req, res) => {
  res.send('Welcome to the Sparkout Tech Info System API');
});

// GET all assets
app.get('/assets', (req, res) => {
  console.log("I am in assets")
  data = db.all(`SELECT 
    "Asset-ID",
    "Asset-Type",
    "Brand",
    "Model",
    "Serial-Number",
    "Purchase_Date",
    "Status",
    "Employee_ID"
    FROM assets`, 
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log("data on the db call")
      console.log(rows)

      res.json(rows);
    });
    console.log("data on the backend")
    console.log(data)
});

// GET single asset
app.get('/assets/:id', (req, res) => {
  console.log("I am getting called here")
  db.get(`SELECT 
    "Asset-ID",
    "Asset-Type",
    "Brand",
    "Model",
    "Serial-Number",
    "Purchase_Date",
    "Status",
    "Employee_ID"
    FROM assets WHERE "Asset-ID" = ?`, 
    [req.params.id], 
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log(row);
      res.json(row);
    });
});

//GET single employee details
app.get('/employees', (req, res) => {
  db.all(`SELECT "Employee_ID", "Name" FROM employees`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);  // Returns a list of employees with ID and Name
  });
});



// ADD asset
app.post('/assets', (req, res) => {
  const { "Asset-Type": assetType, Brand, Model, "Serial-Number": serialNumber, Purchase_Date, Status, Employee_ID } = req.body;
  console.log("Received Employee_ID:", Employee_ID);
  // Basic validation for missing fields
  if (!assetType || !Brand || !Model || !serialNumber || !Purchase_Date || !Status || !Employee_ID) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(`INSERT INTO assets (
    "Asset-Type", "Brand", "Model", "Serial-Number", "Purchase_Date", "Status", "Employee_ID")
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [assetType, Brand, Model, serialNumber, Purchase_Date, Status, Employee_ID],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Serial Number must be unique' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});


// UPDATE asset
app.put('/assets/:id', (req, res) => {
  const { "Asset-Type": assetType, Brand, Model, "Serial-Number": serialNumber, Purchase_Date, Status, Employee_ID } = req.body;
  
  db.run(`UPDATE assets SET 
    "Asset-Type" = ?, 
    "Brand" = ?, 
    "Model" = ?, 
    "Serial-Number" = ?, 
    "Purchase_Date" = ?, 
    "Status" = ?, 
    "Employee_ID" = ?
    WHERE "Asset-ID" = ?`,
    [assetType, Brand, Model, serialNumber, Purchase_Date, Status, Employee_ID, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    });
});


// DELETE asset
app.delete('/assets/:id', (req, res) => {
  db.run(`DELETE FROM assets WHERE "Asset-ID" = ?`, 
    [req.params.id], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    });
    console.log("Asset details deleted");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
