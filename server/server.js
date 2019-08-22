var express = require('express');
var Movies = require('../database/index.js');
var app = express();
var port = 3000;

app.use(express.static('public'));

app.get('/movies/:id', (req, res) =>  {
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


app.listen(port, function(){
  console.log('Server started at port ', port);
});