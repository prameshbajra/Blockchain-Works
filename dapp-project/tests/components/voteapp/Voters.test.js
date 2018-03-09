import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Voters from '../../../src/components/voteapp/Voters';

test('should render NoMatch component', () => {
    const wrapper = shallow(<Voters />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});