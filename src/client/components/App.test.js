import React from 'react';
import App from '../src/client/components/ListItem.jsx';
import renderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('App component', () => {
  const wrapper = shallow(<App />);

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <App />
    ).toJSON;

    expect(tree).toMatchSnapshot;
  });

});