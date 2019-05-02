import React from 'react';
import {shallow} from 'enzyme';

import NodeHeader from '../src/components/NodeHeader';
import defaultTheme from '../src/themes/default';
import defaultDecorators from '../src/components/Decorators';
import defaultAnimations from '../src/themes/animations';
import data from '../example/data';

const onClick = jest.fn();

const renderComponent = (props = {}) => <NodeHeader
    node={data}
    decorators={defaultDecorators}
    animations={defaultAnimations}
    style={defaultTheme}
    onClick={onClick}
    {...props}
/>;

const style = {...defaultTheme.tree.node, ...{activeLink: {background: 'red'}}};

const container = wrapper => wrapper.find('Container');

describe('<NodeHeader/>', () => {
    describe('when node.active is false', () => {
        it('should set Container\'s style prop to own style prop', () => {
            const wrapper = shallow(renderComponent({
                node: {...data, active: false},
                style
            }));
            expect(container(wrapper).props().style).toBe(style);
        });
    });

    describe('when node.active is true', () => {
        it('should set Container\'s style prop to active link', () => {
            const wrapper = shallow(renderComponent({
                node: {...data, active: true},
                style
            }));
            expect(container(wrapper).props().style).toEqual({
                ...style,
                container: {...style.link, ...style.activeLink}
            });
        });
    });

    describe('when node not contains children', () => {
        it('should set Container\'s terminal prop to true', () => {
            const wrapper = shallow(renderComponent({
                node: {...data, children: null},
                style
            }));
            expect(container(wrapper).props().terminal).toBe(true);
        });
    });

    describe('when node contains children', () => {
        it('should set Container\'s terminal prop to false', () => {
            const wrapper = shallow(renderComponent({style}));
            expect(container(wrapper).props().terminal).toBe(false);
        });
    });
});
