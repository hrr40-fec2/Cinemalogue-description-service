import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Ratings from '../Ratings.jsx';
import "./setupTests";

describe ('Ratings', () => {

  it('should render a div with className of imdbRatings', () => {
    const component = shallow(<Ratings />);
    var node = component.find('div');
    expect(node.hasClass('imdbRatings')).toEqual(true);
  });

  // it('should capture the user-inputted rating in its state on change', () => {

  // });

  // it('should update the average rating when user adds a new rating', () => {

  // });


});