var faker = require('faker');

var generateRuntime = function () {
  var hours = faker.random.number(4);
  var minutes = faker.random.number(59);
  return `${hours}h ${minutes}min`;
};

var mpaaRatings = ['G', 'PG', 'PG-13', 'R'];
var genres = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western'];

var generateGenres = function () {
  var movieGenres = [];
  for (var i = 0; i < 3; i++) {
    var genre = faker.random.arrayElement(genres);
    while (movieGenres.includes(genre)) {
      genre = faker.random.arrayElement(genres);
    }
    movieGenres.push(genre);
  }
  return movieGenres;
};

var generateReleaseDate = function () {
  var day = faker.random.number(30);
  var month = faker.date.month();
  var year = faker.random.number({min: 1970, max: 2019});
  return `${day} ${month} ${year}`;
};

var fakeMovie = function () {
  var movie = {};
  movie.director = faker.name.findName();
  movie.writer = faker.name.findName();
  movie.blurb = faker.lorem.paragraph();
  movie.imageUrl = faker.image.imageUrl();
  movie.title = faker.random.word();
  movie.releaseDate = generateReleaseDate();
  movie.mpaaRating = faker.random.arrayElement(mpaaRatings);
  movie.imdbRatings = faker.random.number(100000);
  movie.imdbRatingsAverage = Number((Math.random() * 9).toFixed(1)) + 1;
  movie.runtime = generateRuntime();
  movie.stars = [faker.name.findName(), faker.name.findName(), faker.name.findName()];
  movie.genres = generateGenres();
  return movie;
};

module.exports = fakeMovie;