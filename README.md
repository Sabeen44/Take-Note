# Take-Note

## Overview

Here's an application that can be used to write and save notes. This application uses an Express.js back end and saves/retrieves notes from a JSON file.

## Technologies Used

JavaScript
NodeJS
Node Packages:
Express
uniqid

## Installation

Clone the repository to your local development environment.Navigate to the developer-profile-generator folder using the command prompt.

Run npm install to install all dependencies. To use the application locally, run node server.js in your CLI, and then open http://localhost:3001 in your preferred browswer. The Note Taker app is live on Heroku (see deployed link below).

## Code Snippet

The following code snippet shows how the app is equipped with a routing path and updates notes using post method.

```
app.post("/api/notes", (req, res) => {
console.info(`${req.method} request received to add a note`);
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
               }});}});}});
```

## Deployed Link

## Question

For questions, you may contact me via LinkedIn:
www.linkedin.com/in/sabeen-chaudhry
