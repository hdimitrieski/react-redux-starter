import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('should have a header called \'Hello World!\'', () => {
    const wrapper = shallow(<App />);
    const actual = wrapper.find('h1').text();
    const expected = 'Hello World!';

    expect(actual).toEqual(expected);
  });
});
