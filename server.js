const path = require('path');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(morgan('combined'));

app.get('/api/songs/:title', (req, res) => {
  var title = req.params.title;
  console.log("getting song lyrics for " + title);
  fs.readFile("dist/lyrics/" + title + ".txt", 'utf-8', (err, data) => {
    if (err) return console.log(err);
    res.set('Content-Type', 'text/plain');
    res.status(200).send(data);
  });
});

app.get('/api/songs', (req, res) => {
  console.log("getting song list");
  fs.readFile("taylor_swift_songs.txt", 'utf-8', (err, data) => {
    if (err) return console.log(err);
    res.set('Content-Type', 'application/json');
    var songs = data.split(/\n/).filter(Boolean); // filter to remove empty
    res.status(200).json({
      data: songs
    });
  })
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});
