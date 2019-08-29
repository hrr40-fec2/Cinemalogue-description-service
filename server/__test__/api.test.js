const mockingoose = require('mockingoose').default;
const request = require('supertest');
const Movie = require('../../database/index.js');
const app = require('../app.js');

describe('test server routes', () => {
  //mock Movie.find to return predefined data array
  var movieData = [{
    _id: '123',
    director: 'Director Person',
    writer: 'A Writer',
    blurb: 'This is a blurb.',
    imageUrl: '',
    title: 'Title',
    releaseDate: '14 August 2011',
    mpaaRating: 'G',
    imdbRatings: 20599,
    imdbRatingsAverage: 6.4,
    runtime: '1h 22min',
    stars: ['Victor Frankenstein', 'Bilbo Baggins', 'Jack Sparrow'],
    genres: ['Comedy', 'Action', 'Fantasy']
  }];

  //mock function to replace Movie.find()
  const finderMock = (query) => {
    if (query.getQuery()._id === '123') {
      return movieData;
    } else if (query.getQuery()._id === 'Title') {
      return movieData;
    } else {
      console.log('Error, could not find movie');
    }
  };

  mockingoose(Movie).toReturn(finderMock, 'find');

  it ('should return an array with one movie in it when a get request is made with movie ID or name as a parameter', (done) => {
    // get request using the id as parameter
    request(app).get('/movies/123').then((response) => {
      var movie = response.body[0];
      expect(movie.director).toEqual('Director Person');
      expect(movie.runtime).toEqual('1h 22min');
      done();
    });

    //get request using the name as a parameter
    request(app).get('/movies/Title').then((response) => {
      var movie = response.body[0];
      expect(movie.blurb).toEqual('This is a blurb.');
      expect(movie.writer).toEqual('A Writer');
      done();
    });

  });
});


