const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
const uuid = require("./public/assets/uuid");

const app = express();

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
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

app.post("/api/notes", (req, res) => {
  //console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile(`./db/db.json`, "utf8", (err, data) => {
      if (err) console.log(err);
      else {
        const notesArray = JSON.parse(data);
        console.log(notesArray);
        notesArray.push(newNote);
        fs.writeFile(
          `./db/db.json`,
          JSON.stringify(notesArray, null, 4),
          (err) => {
            if (err) console.log(err);
            else {
              console.log(`note ${newNote.text} received`);
            }
          }
        );
      }
    });
  }
});

app.delete("/api/notes/:id", (req, res) => {
  // reading notes form db.json
  const id = req.params.id;

  fs.readFile(`./db/db.json`, "utf8", (err, data) => {
    if (err) console.log(err);
    else {
      const notesArray = JSON.parse(data);
      const newNotes = notesArray.filter((note) => note.id !== id);
      fs.writeFile("db/db.json", JSON.stringify(newNotes, null, 4), (err) => {
        if (err) console.log(err);
        else {
          console.log("note deleted");
        }
      });
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
