import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Ratings from '../Ratings.jsx';
import "./setupTests";


var fakeMovie = {
  director: 'Bob Bobbins',
  writer: 'Chloe Cat',
  blurb: 'This is a blurb.',
  imageUrl: '',
  title: 'Example',
  releaseDate: '14 August 2011',
  mpaaRating: 'G',
  imdbRatings: 10,
  imdbRatingsAverage: 3,
  runtime: '1h 22min',
  stars: ['Victor Frankenstein', 'Bilbo Baggins', 'Jack Sparrow'],
  genres: ['Comedy', 'Action', 'Fantasy']
};


describe ('Ratings', () => {
  var spy;

  afterEach(() => {
    if (spy) {
      spy.mockClear()
    }
  });

  it('should render a div with className of imdbRatings', () => {
    const component = shallow(<Ratings />);
    var node = component.find('div');
    expect(node.hasClass('imdbRatings')).toEqual(true);
  });

  it('should dynamically render ratings data passed down inside props', () => {
    const component = mount(<Ratings average={fakeMovie.imdbRatingsAverage} amount={fakeMovie.imdbRatings} />);
    expect(component.props().average).toBeTruthy();
    var node = component.find('div');
    expect(node.text()).toEqual('3 stars, 10 ratings');
  });

  it('should call handleInput when the user adds a new rating', () => {
    //spy on the event handler in the Ratings component
    spy = jest.spyOn(Ratings.prototype, 'handleInput');
    const component = mount(<Ratings average={fakeMovie.imdbRatingsAverage} amount={fakeMovie.imdbRatings} handleRatingInput={() => {}}/>);
    //simulate a click event on the first radio button
    component.find('input').first().simulate('click');
    component.find('input').last().simulate('click');
    expect(Ratings.prototype.handleInput).toHaveBeenCalledTimes(2);
  });

  it('should call handleInput with the event as a parameter', () => {
    //spy on the event handler in the Ratings component
    const component = mount(<Ratings average={fakeMovie.imdbRatingsAverage} amount={fakeMovie.imdbRatings} handleRatingInput={() => {}}/>);
    var instance = component.instance();
    spy = jest.spyOn(instance, 'handleInput');
    //simulate click events on different radio buttons
    component.find('input').last().simulate('click');
    expect(instance.handleInput).toHaveBeenCalledWith(expect.objectContaining({
      "type": 'click'
     }));

  });

  it('should call handleInput with an event object containing the correct value', () => {
    const component = mount(<Ratings average={fakeMovie.imdbRatingsAverage} amount={fakeMovie.imdbRatings} handleRatingInput={() => {}}/>);
    var instance = component.instance();
    instance.handleInput = jest.fn((event) => {return event.target.value;});
    spy = jest.spyOn(instance, 'handleInput');
    component.find('input').at(3).simulate('click');
    component.find('input').at(6).simulate('click');
    component.find('input').at(8).simulate('click');
    component.find('input').at(4).simulate('click');
    expect(instance.handleInput.mock.results.length).toEqual(4);
    expect(instance.handleInput.mock.results[0].value).toEqual('4');
    expect(instance.handleInput.mock.results[1].value).toEqual('7');
    expect(instance.handleInput.mock.results[2].value).toEqual('9');
    expect(instance.handleInput.mock.results[3].value).toEqual('5');
  });

  it('should call the parent event handler with a data object containing the new average rating and new number of ratings', () => {
    const handleInputMock = jest.fn();
    const component = mount(<Ratings average={fakeMovie.imdbRatingsAverage} amount={fakeMovie.imdbRatings} handleRatingInput={handleInputMock}/>).instance();

    //call the event handler with mock event
    var fakeClickEvent = {
      target: {value: '8'}
    }
    component.handleInput(fakeClickEvent);
    expect(handleInputMock).toHaveBeenCalledWith({imdbRatings: 11,
      imdbRatingsAverage: 3.5});
    });
});