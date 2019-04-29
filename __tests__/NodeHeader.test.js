import React from 'react';
import {shallow} from 'enzyme';

import NodeHeader from '../src/components/header';
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
    test('should return equal style object if node active is false', () => {
        const wrapper = shallow(renderComponent({
            node: {...data, active: false},
            style
        }));
        expect(container(wrapper).props().style).toEqual(style)
    });
    test('should return a style with a container object with merge between link and activeLink if node active is true', () => {
        const wrapper = shallow(renderComponent({
            node: {...data, active: true},
            style
        }));
        expect(container(wrapper).props().style).toEqual({...style, container: {...style.link, ...style.activeLink}})
    });
    test('should return terminal prop in true if node not contain children', () => {
        const wrapper = shallow(renderComponent({
            node: {...data, children: null},
            style
        }));
        expect(container(wrapper).props().terminal).toBe(true);
    });
    test('should return terminal prop in false if node contain children', () => {
        const wrapper = shallow(renderComponent({style}));
        expect(container(wrapper).props().terminal).toBe(false);
    })
});
