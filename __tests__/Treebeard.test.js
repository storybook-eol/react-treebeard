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
    it('should handle custom makeKeyProp', () => {
        const wrapper = renderComponent({ makeKeyProp: (node) => node.sha });
        const firstNodeKey = wrapper.find('TreeNode').first().key();
        expect(firstNodeKey).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    });
});
