import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ItemData from '../ItemData.jsx';
import "./setupTests";
import Movie from '../../../../database/index.js';

var movie = {
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

describe('ItemData', () => {

  it('should render a div with className of movieDetailsOverview', () => {
    //whether a movie document is fetched from the database or not, it will render a div with the given class
    const component = shallow(<ItemData movieID={'nonexistentmovie'}/>);
    var node = component.find('div');
    expect(node.hasClass('movieDetailsOverview')).toEqual(true);
  });

  describe('ItemData with a movieID passed in as a prop', () => {

    beforeAll((done) => {
      //add the movie to the database
      var exampleMovie = new Movie(movie);
      exampleMovie.save((err, result) => {
        if (err) {
          console.log('Error saving example movie to database: ', err);
        } else {
          console.log('Example movie added to database.');
          done();
        }
      });
    });

    afterAll((done) => {
      //remove the example movie from the database
      Movie.find({ title: 'Example'}).remove().exec((err, result) => {
        if (err) {
          console.log('Error removing example movie from database: ', err);
        } else {
          console.log('Example movie removed.');
          done();
        }
      });
    });

    it('should render data dynamically based on the movieID passed down as a prop', () => {
      //On mount, ItemData makes a get request with the movie name/ID as a request parameter
      const component = mount(<ItemData movieID={'Example'}/>);
      expect(component.props().movieID).toBe('Example');
      //the response from the server should be saved in ItemData's state as an object under the movie property
      //need to test the other stuff AFTER component did mount
      expect(component.state().movie).toBeTruthy();
    });

    // it('should have Ratings as a child component', () => {
    //   const component = mount(<ItemData movieID={'Example'}/>);
    //   var node = component.find('Ratings');
    //   expect(node.length).toBeTruthy();
    // });

    // it('should make a get request to load movie data on mount', () => {

    // });

    // it('should make the get request with props.movieID as the request parameter', () => {

    // });

  });


});

