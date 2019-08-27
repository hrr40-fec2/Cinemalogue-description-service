var createFakeMovie = require('../generateSeedData.js');

describe('helper function that generates fake movie data', () => {

  it('should return a movie object with the appropriate properties and value types', () => {
    var movie = createFakeMovie();
    //use regex that matches any string to test if value is a string
    expect(movie.title).toEqual(expect.stringMatching(/[\s\S]*/));
    expect(movie.director).toEqual(expect.stringMatching(/[\s\S]*/));
    expect(movie.writer).toEqual(expect.stringMatching(/[\s\S]*/));
    expect(movie.blurb).toEqual(expect.stringMatching(/[\s\S]*/));
    expect(movie.imageUrl).toEqual(expect.stringMatching(/[\s\S]*/));
    //expect mpaaRating to match G, PG, PG-13, or R
    expect(movie.mpaaRating).toEqual(expect.stringMatching(/G|(PG-13)|(PG)|R/));
    expect(movie.imdbRatings).toEqual(expect.any(Number));
    expect(movie.imdbRatingsAverage).toBeGreaterThanOrEqual(1);
    expect(movie.imdbRatingsAverage).toBeLessThanOrEqual(10);
    expect(movie.runtime).toEqual(expect.stringContaining('min'));
    expect(movie.runtime).toEqual(expect.stringContaining('h'));
    expect(movie.stars.length).toEqual(3);
    expect(movie.genres.length).toEqual(3);
    //there should only be these 12 properties in the movie object, nothing else
    expect(Object.keys(movie).length).toBe(12);
  });

  it('should assign unique data to each movie it creates', () => {
    var movieOne = createFakeMovie();
    var movieTwo = createFakeMovie();
    expect(movieOne.writer).not.toEqual(movieTwo.writer);
    expect(movieOne.title).not.toEqual(movieTwo.title);
    expect(movieOne.imdbRatingsAverage).not.toEqual(movieTwo.imdbRatingsAverage);
    expect(movieOne.runtime).not.toEqual(movieTwo.runtime);
  });

});