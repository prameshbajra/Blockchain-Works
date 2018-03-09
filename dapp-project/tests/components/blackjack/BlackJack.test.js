import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import BlackJack from '../../../src/components/blackjack/BlackJack';

test('should render BlackJack component', () => {
    const wrapper = shallow(<BlackJack />);
    expect(toJSON(wrapper)).toBeTruthy();
});