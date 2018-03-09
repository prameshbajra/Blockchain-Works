import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Card from '../../../src/components/blackjack/Card';

test('should render NoMatch component', () => {
    const wrapper = shallow(<Card />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});