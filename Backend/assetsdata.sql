DROP TABLE IF EXISTS assets;

CREATE TABLE assets (
  "Asset-ID" INTEGER PRIMARY KEY NOT NULL,
  "Asset-Type" TEXT NOT NULL,
  "Brand" TEXT NOT NULL,
  "Model" TEXT NOT NULL,
  "Serial-Number" INTEGER NOT NULL UNIQUE,
  "Purchase_Date" TEXT,
  "Status" TEXT
);

INSERT INTO assets ("Asset-Type", "Brand", "Model", "Serial-Number", "Purchase_Date", "Status")
VALUES ('Laptop', 'Dell', 'Inspiron 15', 10001, '2023-06-01', 'assigned');
