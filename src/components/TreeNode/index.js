import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {isArray} from 'lodash';

import defaultAnimations from '../../themes/animations';
import {randomString} from '../../util';
import {Ul} from '../common';
import NodeHeader from '../NodeHeader';
import Drawer from './Drawer';
import Loading from './Loading';

const Li = styled('li', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({style}) => style);

class TreeNode extends PureComponent {
    onClick() {
        const {node, onToggle} = this.props;
        const {toggled} = node;
        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    animations() {
        const {animations, node} = this.props;
        if (!animations) {
            return {
                toggle: defaultAnimations.toggle(this.props, 0)
            };
        }
        const animation = Object.assign({}, animations, node.animations);
        return {
            toggle: animation.toggle(this.props),
            drawer: animation.drawer(this.props)
        };
    }

    decorators() {
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    renderChildren(decorators) {
        const {animations, decorators: propDecorators, node, style, onToggle} = this.props;

        if (node.loading) {
            return (
                <Loading {...{decorators, style}}/>
            );
        }

        let children = node.children;
        if (!isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <Ul style={style.subtree}>
                {children.map(child => (
                    <TreeNode
                        {...{onToggle, animations, style}}
                        decorators={propDecorators}
                        key={child.id || randomString()}
                        node={child}
                    />
                ))}
            </Ul>
        );
    }

    render() {
        const {node, style} = this.props;
        const decorators = this.decorators();
        const animations = this.animations();
        const {...restAnimationInfo} = animations.drawer;
        return (
            <Li style={style.base}>
                <NodeHeader {...{decorators, animations, node, style}} onClick={() => this.onClick()}/>
                <Drawer restAnimationInfo={{...restAnimationInfo}}>
                    {node.toggled ? this.renderChildren(decorators, animations) : null}
                </Drawer>
            </Li>
        );
    }
}

TreeNode.propTypes = {
    onToggle: PropTypes.func,
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired
};

export default TreeNode;
