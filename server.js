const express = require("express");
const cors = require("cors");
const fs = require("fs");

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

  const data = readData();

  const gpsPoint = {

    ...req.body,

    serverTime: new Date()
  };

  data.push(gpsPoint);

  saveData(data);

  console.log("GPS RECEIVED");

  res.json({
    success: true
  });
});

app.post("/end-session", (req, res) => {

  console.log("MISSION TERMINÉE");

  console.log(req.body);

  res.json({
    success: true
  });
});

app.get("/history", (req, res) => {

  const data = readData();

  res.json(data);
});

app.get("/", (req, res) => {

  res.sendFile(__dirname + "/public/tracking.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`SERVER RUNNING ON ${PORT}`);
});