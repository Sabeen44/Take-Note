const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
//var uniqid = require("uniqid");
const uuid = require("./public/assets/uuid");

const app = express();

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile(`./db/db.json`, "utf8", (err, data) => {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
});
