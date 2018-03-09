import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Timer from '../../../src/components/voteapp/Timer';

test('should render NoMatch component', () => {
    const wrapper = shallow(<Timer />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});