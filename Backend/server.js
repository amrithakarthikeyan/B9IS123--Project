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
  "Asset-ID" INTEGER PRIMARY KEY,
  "Asset-Type" TEXT NOT NULL,
  "Brand" TEXT,
  "Model" TEXT,
  "Serial-Number" INTEGER,
  "Purchase_Date" TEXT,
  "Status" TEXT
)`);

app.get('/', (req, res) => {
  res.send('Welcome to the Sparkout Tech Info System API');
});
