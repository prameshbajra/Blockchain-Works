import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import AddHouse from '../../../src/components/realestate/AddHouse';

test('should render NoMatch component', () => {
    const wrapper = shallow(<AddHouse />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});