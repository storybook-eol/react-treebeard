import React from 'react';
import {shallow} from 'enzyme';

import TreeNode from '../src/components/TreeNode';
import defaultTheme from '../src/themes/default';
import defaultAnimations from '../src/themes/animations';
import defaultDecorators from '../src/components/Decorators';
import data from './mocks/data';

const onToggle = jest.fn();

const renderComponent = (props = {}) => {
    const wrapper = shallow(
        <TreeNode
            node={data}
            decorators={defaultDecorators}
            animations={defaultAnimations}
            style={defaultTheme}
            onToggle={onToggle}
            {...props}
        />
    );
    wrapper.nodeHeader = () => wrapper.find('NodeHeader');
    wrapper.drawer = () => wrapper.find('Drawer');
    wrapper.loading = () => wrapper.drawer().find('Loading');
    wrapper.simulateClickOnHeader = () => wrapper.nodeHeader().simulate('click');
    return wrapper;
};

describe('<TreeNode/>', () => {
    describe('when NodeHeader is clicked', () => {
        it('should call onToggle', () => {
            const wrapper = renderComponent();
            wrapper.simulateClickOnHeader();
            expect(onToggle).toHaveBeenCalled();
        });
        describe('and node.toggle is true', () => {
            it('should return the selected node and toggled in false', () => {
                const wrapper = renderComponent();
                wrapper.simulateClickOnHeader();
                expect(onToggle).toBeCalledWith(data, false);
            });
        });
        describe('and node.toggle is false', () => {
            it('should return the selected node and toggled in true', () => {
                const node = {...data, toggled: false};
                const wrapper = renderComponent({node});
                wrapper.simulateClickOnHeader();
                expect(onToggle).toBeCalledWith(node, true);
            });
        });
    });

    describe('<Drawer/>', () => {
        describe('when toggle is false', () => {
            it('should have children.size to be 0', () => {
                const wrapper = renderComponent({
                    node: {...data, toggled: false}
                });
                expect(wrapper.drawer().children().length).toBe(0);
            });
        });

        describe('when node has property loading in true', () => {
            it('should render a Loading component', () => {
                const wrapper = renderComponent({
                    node: {id: 1, name: 'test', toggled: true, loading: true}
                });
                expect(wrapper.loading().exists()).toBe(true);
            });
        });

        it('should return seven TreeNode children', () => {
            const wrapper = renderComponent();
            const ul = wrapper.drawer().children();
            expect(ul.children()).toHaveLength(7);
        });
    });

    describe('animations', () => {
        describe('when animations flag is false', () => {
            describe('and toggled is false', () => {
                describe('and animations is called', () => {
                    it('should return an animation object with rotateZ=0 and duration=0', () => {
                        const wrapper = renderComponent({
                            animations: false,
                            node: {...data, toggled: false}
                        });
                        const animations = wrapper.instance().animations();
                        expect(animations).toEqual({
                            toggle: {
                                animation: {rotateZ: 0},
                                duration: 0
                            }
                        });
                    });
                });
            });

            describe('and toggled is true', () => {
                describe('and animations is called', () => {
                    it('should return an animation object with rotateZ=90 and duration=0', () => {
                        const wrapper = renderComponent({animations: false});
                        const animations = wrapper.instance().animations();
                        expect(animations).toEqual({
                            toggle: {
                                animation: {rotateZ: 90},
                                duration: 0
                            }
                        });
                    });
                });
            });
        });
    });

    describe('decorators', () => {
        describe('when node decorators not exists', () => {
            describe('and decorators is called', () => {
                it('should return defaultDecorators', () => {
                    const wrapper = renderComponent({animations: false});
                    const decorators = wrapper.instance().decorators();
                    expect(decorators).toEqual(defaultDecorators);
                });
            });
        });
    });
});
