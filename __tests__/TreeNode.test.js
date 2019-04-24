import React from 'react';
import {shallow} from 'enzyme';

import TreeNode from '../src/components/TreeNode';
import defaultTheme from '../src/themes/default';
import defaultAnimations from '../src/themes/animations';
import defaultDecorators from '../src/components/Decorators';
import data from '../example/data';

const clickFn = jest.fn();

const renderComponent = (props = {}) => <TreeNode
    node={data}
    decorators={defaultDecorators}
    animations={defaultAnimations}
    style={defaultTheme}
    {...props}
/>;

const simulateClickOnButton = wrapper => wrapper.find('NodeHeader').simulate('click');

describe('<TreeNode/>', () => {
    describe('when onToggle function is called', () => {
        test('should call correctly', () => {
            const wrapper = shallow(renderComponent({onToggle: clickFn}));
            simulateClickOnButton(wrapper);
            expect(clickFn).toHaveBeenCalled();
        });
        test('should return a node selected', () => {
            const wrapper = shallow(renderComponent({onToggle: clickFn}));
            clickFn.mockReturnValue(data);
            simulateClickOnButton(wrapper);
            expect(clickFn()).toEqual(data);
        });
        test('should return toggled boolean on false', () => {
            const wrapper = shallow(renderComponent({onToggle: clickFn}));
            clickFn.mockImplementation((node, toggled) => toggled);
            simulateClickOnButton(wrapper);
            expect(clickFn.mock.calls[0][1]).toBe(false);
        });
    });
});
