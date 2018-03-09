import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import CandidateList from '../../../src/components/voteapp/CandidateList';

test('should render CandidateList component', () => {
    const wrapper = shallow(<CandidateList />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});