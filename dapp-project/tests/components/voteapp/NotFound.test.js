import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import NotFound from '../../../src/components/voteapp/NotFound';

test('should render NoMatch component', () => {
    const wrapper = shallow(<NotFound />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});