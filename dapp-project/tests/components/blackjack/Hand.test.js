import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Hand from '../../../src/components/blackjack/Hand';

test('should render NoMatch component', () => {
    const wrapper = shallow(<Hand />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});