var express = require('express');
var Movies = require('../database/index.js');
var app = express();


app.use(express.static('public'));

app.get('/movies/:id', (req, res) =>  {
  console.log('IN GET REQUEST>>>>>>>>>>');
  Movies.find({_id: req.params.id}, (err, movie) => {
    if (err) {
      console.log('Error finding movie with id ' + req.params.id + ': ', err);
      //if parameter doesn't exist as id, check if it matches any name in the database
      Movies.find({title: req.params.id}, (err, movie) => {
        if (err) {
          console.log('Error finding movie with name ' + req.params.id + ':', err);
        } else {
          res.send(movie);
        }
      });
    } else {
      res.send(movie);
    }
  });
});

app.post('/movies/:id/ratings', (req, res) => {
  console.log('Request body: ', req.body);
  res.send();
});

module.exports = app;