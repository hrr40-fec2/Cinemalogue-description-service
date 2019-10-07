var mongoose = require('mongoose');
//when using docker toolbox, replace with below url
var dockerUrl = 'mongodb://mongo/movies';
mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true});

let movieSchema = mongoose.Schema({
  title: String,
  releaseDate: String,
  mpaaRating: String,
  imdbRatings: Number,
  imdbRatingsAverage: Number,
  genres: [String],
  runtime: String,
  blurb: String,
  director: String,
  writer: String,
  stars: [String],
  imageUrl: String
});

let Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;