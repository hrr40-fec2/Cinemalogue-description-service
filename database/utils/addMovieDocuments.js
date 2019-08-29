var Movie = require('../index.js');
var fakeMovie = require('./generateSeedData.js');

var addMovieDocuments = function (n) {
  for (var i = 0; i < n; i++) {
    var options = fakeMovie();
    var movie = new Movie (options);
    movie.save((err, movie) => {
      if (err) {
        console.log('Error inserting movie document: ', err);
      }
    });
  }
};

module.exports = addMovieDocuments;



