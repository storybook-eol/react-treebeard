/*  eslint no-unused-expressions:0  */

'use strict';

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import defaultDecorators from '../../../src/components/decorators';
import TreeNode from '../../../src/components/node';
import Treebeard from '../../../src/components/treebeard';
import defaultAnimations from '../../../src/themes/animations';
import defaultTheme from '../../../src/themes/default';

const defaults = {
    name: '',
    children: []
};

describe('treebeard component', () => {
    it('should render the treebase as a list', () => {
        const treebeard = TestUtils.renderIntoDocument(<Treebeard data={defaults}/>);
        const treeBase = TestUtils.findRenderedDOMComponentWithTag(treebeard, 'ul');

        treeBase.tagName.toLowerCase().should.equal('ul');
    });

    it('should render the treebase as a list', () => {
        const treebeard = TestUtils.renderIntoDocument(<Treebeard data={defaults}/>);
        const nodes = TestUtils.scryRenderedComponentsWithType(treebeard, TreeNode);

        nodes.length.should.equal(1);
    });

    it('should pass the top level tree node the associated props', () => {
        const treebeard = TestUtils.renderIntoDocument(
            <Treebeard data={defaults}
                       onToggle={() => null}/>
        );
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);

        node.props.node.should.equal(treebeard.props.data);
        node.props.onToggle.should.equal(treebeard.props.onToggle);
    });

    it('should use the default theme if none specified', () => {
        const treebeard = TestUtils.renderIntoDocument(<Treebeard data={defaults}/>);
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);

        node.props.style.should.equal(defaultTheme.tree.node);
    });

    it('should use the default animations if none specified', () => {
        const treebeard = TestUtils.renderIntoDocument(<Treebeard data={defaults}/>);
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);

        node.props.animations.should.equal(defaultAnimations);
    });

    it('should use the default decorators if none specified', () => {
        const treebeard = TestUtils.renderIntoDocument(<Treebeard data={defaults}/>);
        const node = TestUtils.findRenderedComponentWithType(treebeard, TreeNode);

        node.props.decorators.should.equal(defaultDecorators);
    });

    it('should support rendering multiple nodes at the root level', () => {
        const multipleRootNodes = [
            {name: 'root-1', children: []},
            {name: 'root-2', children: []}
        ];
        const treebeard = TestUtils.renderIntoDocument(<Treebeard data={multipleRootNodes}/>);
        const nodes = TestUtils.scryRenderedComponentsWithType(treebeard, TreeNode);

        nodes.length.should.equal(multipleRootNodes.length);
    });
});
