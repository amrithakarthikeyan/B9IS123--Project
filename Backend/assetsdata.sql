DROP TABLE IF EXISTS Assets;

CREATE TABLE "Assets" (
	"Asset-ID"	INTEGER,
	"Asset-Type"	TEXT NOT NULL,
	"Brand"	TEXT,
	"Model"	TEXT,
	"Serial-Number"	INTEGER,
	"Purchase_Date"	TEXT,
	"Status"	TEXT,
	PRIMARY KEY("Asset-ID")
);
