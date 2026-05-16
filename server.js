const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "gps-data.json";

function readData() {

  try {

    const data = fs.readFileSync(DATA_FILE, "utf8");

    return JSON.parse(data);

  } catch {

    return [];
  }
}

function saveData(data) {

  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(data, null, 2)
  );
}

app.post("/gps", (req, res) => {
});