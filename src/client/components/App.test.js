import React from 'react';
import App from './app.js';
import renderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() })

describe('App component', () => {
  const wrapper = shallow(<App />);

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <App />
    ).toJSON;

    expect(tree).toMatchSnapshot;
  });

});