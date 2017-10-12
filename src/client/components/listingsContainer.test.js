import React from 'react';
import ListingsContainer from './listingsContainer.js';
import renderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe('ListingsContainer component', () => {
  const wrapper = shallow(<ListingsContainer />);

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <ListingsContainer />
    ).toJSON;

    expect(tree).toMatchSnapshot;
  });

});