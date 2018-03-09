import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Results from '../../../src/components/voteapp/Results';

test('should render NoMatch component', () => {
    const wrapper = shallow(<Results />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});