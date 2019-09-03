var express = require('express');
var Movies = require('../database/index.js');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/movies/:id', (req, res) => {
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

app.post('/movies/:id', (req, res) => {
  Movies.update({_id: req.params.id}, req.body, (err, movie) => {
    if (err) {
      console.log('Error updating movie with id ' + req.params.id + ': ', err);
      Movies.update({title: req.params.id}, req.body, (err, movie) => {
        if (err) {
          console.log('Error updating movie with name ' + req.params.id + ':', err);
        } else {
          res.send();
        }
      });
    } else {
      res.send();
    }
  });
});

module.exports = app;