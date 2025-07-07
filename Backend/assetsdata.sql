CREATE TABLE IF NOT EXISTS assets (
  "Asset-ID" INTEGER PRIMARY KEY NOT NULL,           
  "Asset-Type" TEXT NOT NULL,
  "Brand" TEXT NOT NULL,
  "Model" TEXT NOT NULL,
  "Serial-Number" INTEGER NOT NULL UNIQUE,          
  "Purchase_Date" TEXT,
  "Status" TEXT
);