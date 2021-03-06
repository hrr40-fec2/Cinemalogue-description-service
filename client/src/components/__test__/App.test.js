import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ItemOverview from '../ItemOverview.jsx';
import "./setupTests";
jest.mock('jquery');

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


describe('ItemOverview', () => {
  var spy;

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });

  it('should have ItemData as a child component', () => {
    var component = mount(<ItemOverview />);
    component.containsMatchingElement('ItemData');
  });

  it('should call fetchMovieData on mount', () => {
    spy = jest.spyOn(ItemOverview.prototype, 'fetchMovieData');
    var component = mount(<ItemOverview />);
    expect(spy).toHaveBeenCalled();
  });

  it('should set state.movie with the fetched movie data', () => {
    var component = mount(<ItemOverview />);
    expect(component.state('movie')).toEqual(fakeMovie);
  });

});
