import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Owner from '../../../src/components/voteapp/Owner';

test('should render Owner component', () => {
    const wrapper = shallow(<Owner />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});