const express = require('express');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors());