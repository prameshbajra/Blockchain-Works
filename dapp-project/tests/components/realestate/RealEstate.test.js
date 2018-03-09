import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import RealEstate from '../../../src/components/realestate/RealEstate';

test('should render NoMatch component', () => {
    const wrapper = shallow(<RealEstate />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});