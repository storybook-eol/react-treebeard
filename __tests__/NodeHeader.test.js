import React from 'react';
import {shallow} from 'enzyme';

import NodeHeader from '../src/components/NodeHeader';
import defaultTheme from '../src/themes/default';
import defaultDecorators from '../src/components/Decorators';
import defaultAnimations from '../src/themes/animations';
import data from './mocks/data';

const onClick = jest.fn();

const renderComponent = (props = {}) => {
    const wrapper = shallow(
        <NodeHeader
            node={data}
            decorators={defaultDecorators}
            animations={defaultAnimations}
            style={defaultTheme}
            onClick={onClick}
            {...props}
        />
    );
    wrapper.container = () => wrapper.find('Container');

    return wrapper;
};

const style = {...defaultTheme.tree.node, ...{activeLink: {background: 'red'}}};

describe('<NodeHeader/>', () => {
    describe('when node.active is false', () => {
        it('should set Container\'s style prop to own style prop', () => {
            const wrapper = renderComponent({
                node: {...data, active: false},
                style
            });
            expect(wrapper.container().props().style).toBe(style);
        });
    });

    describe('when node.active is true', () => {
        it('should set Container\'s style prop to active link', () => {
            const wrapper = renderComponent({
                node: {...data, active: true},
                style
            });
            expect(wrapper.container().props().style).toEqual({
                ...style,
                container: {...style.link, ...style.activeLink}
            });
        });
    });

    describe('when node not contains children', () => {
        it('should set Container\'s terminal prop to true', () => {
            const wrapper = renderComponent({
                node: {...data, children: null},
                style
            });
            expect(wrapper.container().props().terminal).toBe(true);
        });
    });

    describe('when node contains children', () => {
        it('should set Container\'s terminal prop to false', () => {
            const wrapper = renderComponent({style});
            expect(wrapper.container().props().terminal).toBe(false);
        });
    });
});
