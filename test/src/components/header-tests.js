/*  eslint no-unused-expressions:0  */

'use strict';

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import Header from '../../../src/components/header';

import {createDecorators} from '../utils/factory';

class ContainerType extends React.Component {
    render() {
        return <div/>;
    }
}

const defaults = {
    style: {},
    node: {children: []},
    animations: {toggle: {}},
    decorators: createDecorators({container: ContainerType})
};

describe('header component', () => {
    it('should render the container decorator', () => {
        const header = TestUtils.renderIntoDocument(<Header {...defaults}/>);
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);

        container.should.exist;
    });

    it('should update the component if a prop changes', () => {
        const node = {toggled: false};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const nextProps = {node: {toggled: !node.toggled}};

        header.shouldComponentUpdate(nextProps).should.be.true;
    });

    it('should not update the component if no props change', () => {
        const node = {toggled: false};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const nextProps = Object.assign({}, defaults, {node: {toggled: node.toggled}});

        header.shouldComponentUpdate(nextProps).should.be.false;
    });

    it('should not update when deep nested animation props have not changed value', () => {
        const animations = {nested: {prop: 'value'}};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    animations={animations}/>
        );
        const sameAnimationProp = {animations: {nested: {prop: animations.nested.prop}}};
        const nextProps = Object.assign({}, defaults, sameAnimationProp);

        header.shouldComponentUpdate(nextProps).should.be.false;
    });

    it('should update when deep nested animation props have changed value', () => {
        const animations = {nested: {prop: 'value'}};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    animations={animations}/>
        );
        const diffAnimationProp = {animations: {nested: {prop: 'new-value'}}};
        const nextProps = Object.assign({}, defaults, diffAnimationProp);

        header.shouldComponentUpdate(nextProps).should.be.true;
    });

    it('should pass a true terminal prop to the container when there are no children in the node', () => {
        const node = {name: 'terminal-node'};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);

        container.props.terminal.should.be.true;
    });

    it('should pass a false terminal prop to the container when there are children in the node', () => {
        const node = {children: [{name: 'child-node'}]};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);

        container.props.terminal.should.be.false;
    });

    it('should pass in the high-level link style to the container', () => {
        const style = {link: {backgroundColor: 'black'}};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    style={style}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);

        container.props.style.container[0].should.equal(style.link);
    });

    it('should pass the active link style prop to the container when the node is active', () => {
        const node = {active: true};
        const style = {activeLink: {color: 'red'}};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}
                    style={style}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);

        container.props.style.container[1].should.equal(style.activeLink);
    });

    it('should not pass the active link style prop to the container when the node is inactive', () => {
        const node = {active: false};
        const style = {activeLink: {color: 'red'}};
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                    node={node}
                    style={style}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);

        global.should.not.exist(container.props.style.container[1]);
    });

});
