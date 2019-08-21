var faker = require('faker');
var Movie = require('./index.js');

function generateRuntime () {
  var hours = Math.floor(Math.random()*4);
  var minutes = Math.floor(Math.random()*60);
  return `${hours}h ${minutes}min`;
};

var mpaaRatings = ['G', 'PG', 'PG-13', 'R'];
var genres = ['Action', 'Adventure', 'Animation' ,'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western'];

function randomGenre () {
  return genres[Math.floor(Math.random()*18)];
}

function fakeMovie () {
  var movie = {};
  movie.director = faker.name.findName();
  movie.writer = faker.name.findName();
  movie.blurb = faker.lorem.sentence();
  movie.imageUrl = faker.image.imageUrl();
  movie.title = faker.lorem.words();
  movie.releaseDate = `${faker.date.past()}`;
  movie.mpaaRating = mpaaRatings[Math.floor(Math.random()*4)];
  movie.imdbRatings = Math.floor(Math.random()*100,000);
  movie.imdbRatingsAverage = Number((Math.random()*10).toFixed(1));
  movie.runtime = generateRuntime();
  movie.stars = [faker.name.findName(), faker.name.findName(), faker.name.findName()];
  movie.genres = [randomGenre(), randomGenre(), randomGenre()];
  return movie;
}


function addMovieDocuments (n) {
  for (var i = 0; i < n; i++) {
    var options = fakeMovie();
    var movie = new Movie (options);
    movie.save((err, movie) => {
      if (err) {
        console.log('Error inserting movie document: ', err);
      }
    });
  }
}

addMovieDocuments(100);