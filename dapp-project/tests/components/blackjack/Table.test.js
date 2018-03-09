import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Table from '../../../src/components/blackjack/Table';

test('should render Table component', () => {
    const wrapper = shallow(<Table />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});