import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import HouseList from '../../../src/components/realestate/HouseList';

test('should render NoMatch component', () => {
    const wrapper = shallow(<HouseList />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});