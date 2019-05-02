import React from 'react';
import {shallow} from 'enzyme';

import TreeNode from '../src/components/TreeNode';
import defaultTheme from '../src/themes/default';
import defaultAnimations from '../src/themes/animations';
import defaultDecorators from '../src/components/Decorators';
import data from '../example/data';

const onToggle = jest.fn();

const renderComponent = (props = {}) => <TreeNode
    node={data}
    decorators={defaultDecorators}
    animations={defaultAnimations}
    style={defaultTheme}
    onToggle={onToggle}
    {...props}
/>;

const simulateClickOnHeader = wrapper => wrapper.find('NodeHeader').simulate('click');

describe('<TreeNode/>', () => {
    describe('when NodeHeader is clicked', () => {
        it('should call onToggle with the selected node and toggled in false', () => {
            const wrapper = shallow(renderComponent());
            simulateClickOnHeader(wrapper);
            expect(onToggle).toHaveBeenCalled();
            expect(onToggle).toBeCalledWith(data, false);
        });
    });

    describe('> <Drawer/>', () => {
        describe('when toggle is false', () => {
            it('should have children.size to be 0', () => {
                const wrapper = shallow(renderComponent({
                    node: {...data, toggled: false}
                }));
                expect(wrapper.find('Drawer').children().length).toBe(0);
            });
        });

        describe('when node has property loading in true', () => {
            it('should render a Loading component', () => {
                const wrapper = shallow(renderComponent({
                    node: {id: 1, name: 'test', toggled: true, loading: true}
                }));
                const drawer = wrapper.find('Drawer');
                expect(drawer.find('Loading').exists()).toBe(true);
            });
        });

        it('should return seven TreeNode children', () => {
            const wrapper = shallow(renderComponent());
            const drawer = wrapper.find('Drawer');
            const ul = drawer.children();
            expect(ul.children()).toHaveLength(7);
        });
    });

    describe('animations', () => {
        describe('when animations flag is false', () => {
            describe('and toggled is false', () => {
                describe('and animations is called', () => {
                    it('should return an animation object with rotateZ=0 and duration=0', () => {
                        const wrapper = shallow(renderComponent({
                            animations: false,
                            node: {...data, toggled: false}
                        }));
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
                        const wrapper = shallow(renderComponent({animations: false}));
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

    describe('> decorators', () => {
        describe('when node decorators not exists', () => {
            describe('and decorators is called', () => {
                it('should return defaultDecorators', () => {
                    const wrapper = shallow(renderComponent({animations: false}));
                    const decorators = wrapper.instance().decorators();
                    expect(decorators).toEqual(defaultDecorators);
                });
            });
        });
    });
});
