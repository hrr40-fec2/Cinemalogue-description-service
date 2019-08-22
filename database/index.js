var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies');

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