/*  eslint no-unused-expressions:0  */

'use strict';

const sinon = require('sinon');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const TreeNode = require('../../../src/components/node');
const factory = require('../utils/factory');

const defaults = {
    style: {},
    node: { chilren: [] },
    animations: factory.createAnimations(),
    decorators: factory.createDecorators()
};

describe('node component', () => {
    it('should initialise the toggled state from the node prop', () => {
        const node = { toggled: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        treeNode.state.toggled.should.equal(node.toggled);
    });

    it('should set the toggled state if the props change and it is defined', () => {
        const node = { toggled: false };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        const changedProps = { node: { toggled: true } };
        treeNode.componentWillReceiveProps(changedProps);
        treeNode.state.toggled.should.equal(changedProps.node.toggled);
    });

    it('should not set the toggled state if the props change and it is not defined', () => {
        const original = { toggled: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={original}
            />
        );
        const changedProps = { node: { toggled: undefined } };
        treeNode.componentWillReceiveProps(changedProps);
        treeNode.state.toggled.should.equal(original.toggled);
    });

    it('should invert the toggle state on click', () => {
        const node = { toggled: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                node={node}
            />
        );
        treeNode.onClick();
        treeNode.state.toggled.should.equal(!node.toggled);
    });

    it('should call the onToggle callback once if it is registered on click', () => {
        const onToggle = sinon.spy();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                onToggle={onToggle}
            />
        );
        treeNode.onClick();
        onToggle.should.be.called.once;
    });

    it('should not throw an exception if a callback is not registered on click', () => {
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        (() => { treeNode.onClick(); }).should.not.throw(Error);
    });

    it('should use the node animations if defined', () => {
        const nodeAnimations = {
            toggle: sinon.stub().returns({ duration: 0, animation: 'fadeIn' }),
            drawer: sinon.stub().returns({ duration: 0, animation: 'fadeIn' })
        };
        const node = { animations: nodeAnimations };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                node={node}
            />
        );
        treeNode.animations();
        nodeAnimations.toggle.should.be.calledWith(treeNode.state);
        nodeAnimations.drawer.should.be.calledWith(treeNode.state);
    });

    it('should fallback to the prop animations if the node animations are not defined', () => {
        const animations = {
            toggle: sinon.stub().returns({ duration: 0, animation: 'fadeIn' }),
            drawer: sinon.stub().returns({ duration: 0, animation: 'fadeIn' })
        };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                animations={animations}
            />
        );
        treeNode.animations();
        animations.toggle.should.be.calledWith(treeNode.state);
        animations.drawer.should.be.calledWith(treeNode.state);
    });

    it('should use the node decorators if defined', () => {
        const ToggleDecorator = React.createClass({ render: () => <div/> });
        const HeaderDecorator = React.createClass({ render: () => <div/> });
        const nodeDecorators = {
            Toggle: ToggleDecorator,
            Header: HeaderDecorator
        };
        const node = { decorators: nodeDecorators, children: [] };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                node={node}
            />
        );
        TestUtils.findRenderedComponentWithType(treeNode, ToggleDecorator).should.exist;
        TestUtils.findRenderedComponentWithType(treeNode, HeaderDecorator).should.exist;
    });

    it('should fallback to the prop decorators if the node decorators are not defined', () => {
        const ToggleDecorator = React.createClass({ render: () => <div/> });
        const HeaderDecorator = React.createClass({ render: () => <div/> });
        const decorators = {
            Toggle: ToggleDecorator,
            Header: HeaderDecorator
        };
        const node = { children: [] };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                decorators={decorators}
                node={node}
            />
        );
        TestUtils.findRenderedComponentWithType(treeNode, ToggleDecorator).should.exist;
        TestUtils.findRenderedComponentWithType(treeNode, HeaderDecorator).should.exist;
    });

    it('should render a list item at the top level', () => {
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        const topLevel = treeNode.refs.topLevel;
        topLevel.tagName.toLowerCase().should.equal('li');
    });

    it('should render the NodeHeader component', () => {
        const NodeHeader = require('../../../src/components/header');
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        TestUtils.findRenderedComponentWithType(treeNode, NodeHeader).should.exist;
    });

    it('should render the subtree if toggled', () => {
        const node = { toggled: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults} node={node}/>
        );
        treeNode.refs.subtree.should.exist;
    });

    it('should not render the children if not toggled', () => {
        const node = { toggled: false };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults} node={node}/>
        );
        global.should.not.exist(treeNode.refs.subtree);
    });

    it('should wrap the children in a velocity transition group', () => {
        const TransitionGroup = require('velocity-react').VelocityTransitionGroup;
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        const component = TestUtils.findRenderedComponentWithType(treeNode, TransitionGroup);
        component.should.exist;
    });

    it('should pass velocity the drawer enter animation and duration props', () => {
        const animations = factory.createAnimations();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                animations={animations}
            />
        );
        const velocity = treeNode.refs.velocity;
        const drawer = animations.drawer();
        velocity.props.enter.animation.should.equal(drawer.enter.animation);
        velocity.props.enter.duration.should.equal(drawer.enter.duration);
    });

    it('should pass velocity the drawer leave animation and duration props', () => {
        const animations = factory.createAnimations();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                animations={animations}
            />
        );
        const velocity = treeNode.refs.velocity;
        const drawer = animations.drawer();
        velocity.props.leave.animation.should.equal(drawer.leave.animation);
        velocity.props.leave.duration.should.equal(drawer.leave.duration);
    });

    it('should wrap the children in a list', () => {
        const node = { toggled: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        const subtree = treeNode.refs.subtree;
        subtree.tagName.toLowerCase().should.equal('ul');
    });

    it('should render a TreeNode component for each child', () => {
        const node = {
            toggled: true,
            children: [ {node: {}}, {node: {}}, {node: {}} ]
        };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        // Find All TreeNodes (+ Top Level TreeNode)
        const nodes = TestUtils.scryRenderedComponentsWithType(treeNode, TreeNode);
        nodes.length.should.equal(node.children.length + 1);
    });

    it('should render the loading decorator if the node is loading and toggled', () => {
        const node = { toggled: true, loading: true };
        const LoadingDecorator = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ loading: LoadingDecorator });
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
                decorators={decorators}
            />
        );
        const loading = TestUtils.findRenderedComponentWithType(treeNode, LoadingDecorator);
        loading.should.exist;
    });

    it('should not render the loading decorator if the node is not loading but toggled', () => {
        const node = { toggled: true, loading: false };
        const LoadingDecorator = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ loading: LoadingDecorator });
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
                decorators={decorators}
            />
        );
        const loading = TestUtils.scryRenderedComponentsWithType(treeNode, LoadingDecorator);
        loading.should.be.empty;
    });

    it('should not render the children if the node is Loading', () => {
        const node = { toggled: true, loading: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        global.should.not.exist(treeNode.refs.subtree);
    });

    it('should render a child with an id key if available', () => {
        const id = 'SpecialNode';
        const node = {
            toggled: true,
            children: [{ id }]
        };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        const nodes = TestUtils.scryRenderedComponentsWithType(treeNode, TreeNode);
        const element = ReactDOM.findDOMNode(nodes[1]);
        const expectedId = '$' + id;
        element.dataset.reactid.should.contain(expectedId);
    });

    it('should render a child with an index key if id is not available', () => {
        const node = {
            toggled: true,
            children: [{ name: 'node' }]
        };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        const nodes = TestUtils.scryRenderedComponentsWithType(treeNode, TreeNode);
        const element = ReactDOM.findDOMNode(nodes[1]);
        const expectedId = '$0';
        element.dataset.reactid.should.contain(expectedId);
    });

});
