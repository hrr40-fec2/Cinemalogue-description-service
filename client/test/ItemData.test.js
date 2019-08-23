import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ItemData from '../src/components/ItemData.jsx';

describe('ItemData', () => {
  it('should render correctly in "debug" mode', () => {    const component = shallow(<ItemData debug />);

    expect(component).toMatchSnapshot();
  });
});

// it('renders correctly', () => {
//   const tree = render
//     .create(<ItemData movieID={'5d5f2e5eebc81a1179bbbc2a'}/>)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });