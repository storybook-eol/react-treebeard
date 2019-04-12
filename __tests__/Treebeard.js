import React from 'react';
import {shallow} from 'enzyme';

import Treebeard from '../src/components';

const data = {
    name: 'root',
    toggled: true,
    id: 1,
    children: [{
        name: 'parent',
        children: [
            {name: 'child1'},
            {name: 'child2'}
        ]
    }]
};

describe('<Treebeard/>', () => {
    const wrapper = shallow(<Treebeard data={data}/>);
    test('should exist ul', () => {
        expect(wrapper.find('ul').exists()).toBe(true);
    });
});
