/*  eslint no-unused-expressions:0  */

'use strict';

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TreeNode = require('../../../src/components/node');
const Treebeard = require('../../../src/components/treebeard');

const defaults = {
    name: '',
    children: []
};

describe('treebeard component', () => {
    it('should render the treebase as a list', () => {
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard data={defaults}/>
        );
        const treeBase = treebeard.refs.treeBase;
        treeBase.tagName.toLowerCase().should.equal('ul');
    });

    it('should render the treebase as a list', () => {
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard data={defaults}/>
        );
        const nodes = TestUtils.scryRenderedComponentsWithType(treebeard, TreeNode);
        nodes.length.should.equal(1);
    });

    it('should pass the top level tree node the associated props', () => {
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard
                data={defaults}
                onToggle={()=>{}}
            />
        );
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);
        node.props.node.should.equal(treebeard.props.data);
        node.props.onToggle.should.equal(treebeard.props.onToggle);
    });

    it('should use the default theme if none specified', () => {
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard data={defaults}/>
        );
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);
        const defaultTheme = require('../../../src/themes/default');
        node.props.style.should.equal(defaultTheme.tree.node);
    });

    it('should use the default animations if none specified', () => {
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard data={defaults}/>
        );
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);
        const defaultAnimations = require('../../../src/themes/animations');
        node.props.animations.should.equal(defaultAnimations);
    });

    it('should use the default decorators if none specified', () => {
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard data={defaults}/>
        );
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);
        const defaultDecorators = require('../../../src/components/decorators');
        node.props.decorators.should.equal(defaultDecorators);
    });

    it('should support rendering multiple nodes at the root level', () => {
        const multipleRootNodes = [
            { name: 'root-1', children: [] },
            { name: 'root-2', children: [] }
        ];
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard data={multipleRootNodes}/>
        );
        const nodes = TestUtils.scryRenderedComponentsWithType(treebeard, TreeNode);
        nodes.length.should.equal(multipleRootNodes.length);
    });

});
