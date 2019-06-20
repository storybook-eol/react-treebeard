import React from 'react';
import {shallow} from 'enzyme';

import Treebeard from '../src/components';
import data from './mocks/data';

const renderComponent = (props = {}) => {
    const wrapper = shallow(
        <Treebeard data={props.data || data} {...props}/>
    );
    wrapper.treeNode = () => wrapper.find('TreeNode');
    return wrapper;
};

describe('<Treebeard/>', () => {
    it('should match default snapshot', () => {
        const wrapper = renderComponent();
        expect(wrapper).toMatchSnapshot();
    });
});
