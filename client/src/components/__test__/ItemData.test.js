import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ItemData from '../ItemData.jsx';
import "./setupTests";

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

describe('ItemData', () => {

  describe('ItemData with no movie selected', () => {
    var component;

    beforeEach(() => {
      component = shallow(<ItemData movie={null}/>);
    });

    it('should render a div with className of movieDetailsOverview', () => {
      var node = component.find('div');
      expect(node.hasClass('movieDetailsOverview')).toEqual(true);
    });

    it('should render loading text before movie loads', () => {
      var node = component.find('div');
      expect(node.text()).toEqual('Loading...');
    });

  });


  describe('ItemData with a movieID passed in as a prop', () => {
    var component;

    beforeEach(() => {
      component = mount(<ItemData movie={fakeMovie}/>);
    });


    it('should render data dynamically based on the movieID passed down as a prop', () => {
      expect(component.props().movie).toBeTruthy();
      expect(component.find('h1').text()).toEqual('Example');
      expect(component.find('h2').text()).toEqual('14 August 2011');
    });

    it('should have Ratings as a child component', () => {
      component.containsMatchingElement('Ratings');
    });

  });


});

