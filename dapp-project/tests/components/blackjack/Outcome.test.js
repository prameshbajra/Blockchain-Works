import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Outcome from '../../../src/components/blackjack/Outcome';

test('should render Outcome component', () => {
    const wrapper = shallow(<Outcome />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});