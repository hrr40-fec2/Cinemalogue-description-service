var fakeMovie = {
  director: 'Bob Bobbins',
  writer: 'Chloe Cat',
  blurb: 'This is a blurb.',
  imageUrl: '',
  title: 'Example',
  releaseDate: '14 August 2011',
  mpaaRating: 'G',
  imdbRatings: 20599,
  imdbRatingsAverage: 6.4,
  runtime: '1h 22min',
  stars: ['Victor Frankenstein', 'Bilbo Baggins', 'Jack Sparrow'],
  genres: ['Comedy', 'Action', 'Fantasy']
};

const $ = {
  post: function (url, data, callback) {

  },
  get: function (url, callback) {
    callback([fakeMovie]);
  }
};

export default $;