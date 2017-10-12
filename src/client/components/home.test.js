import React from 'react';
import Home from './home.js';
import renderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe('Home component', () => {
  const wrapper = shallow(<Home />);

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <Home />
    ).toJSON;

    expect(tree).toMatchSnapshot;
  });

});