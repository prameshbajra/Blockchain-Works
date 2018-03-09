import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Vote from '../../../src/components/voteapp/Vote';

test('should render NoMatch component', () => {
    const wrapper = shallow(<Vote />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});