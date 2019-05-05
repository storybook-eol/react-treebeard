import React from 'react';
import {shallow} from 'enzyme';
import {castArray} from 'lodash';

import Treebeard from '../src/components';
import data from './mocks/data';

const renderComponent = (props = {}) => shallow(
    <Treebeard data={castArray(data)} {...props}/>
);

describe('<Treebeard/>', () => {
    it('should match default snapshot', () => {
        const wrapper = renderComponent();
        expect(wrapper).toMatchSnapshot();
    });
});
