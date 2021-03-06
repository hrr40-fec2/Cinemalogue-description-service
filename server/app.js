var Movies = require('../database/index.js');
var express = require('express');
const cors = require('cors');
var bodyparser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/movies/random_id', (req, res) => {
  var random = Math.floor(Math.random() * 100);
  Movies.findOne().skip(random).exec((err, movie) => {
    if (err) {
      console.log('Error finding movie ', err);
    } else {
      res.send(movie._id);
    }
  });
});

app.get('/movies/:id', (req, res) => {
  Movies.find({_id: req.params.id}, (err, movie) => {
    if (err) {
      console.log('Error finding movie with id ' + req.params.id + ': ', err);
      //if parameter doesn't match an id, check if it matches by name
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