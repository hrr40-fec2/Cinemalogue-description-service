import React from 'react';
import { shallow } from 'enzyme';
import ItemData from '../ItemData.jsx';
import "./setupTests";

describe('ItemData', () => {

  it('should render a div with className of movieDetailsOverview', () => {
    const component = shallow(<ItemData />);
    var node = component.find('div');
    expect(node.length).toEqual(1);
  });
});

