import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Interface from '../../../src/components/blackjack/Interface';

test('should render Interface component', () => {
    const wrapper = shallow(<Interface />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});