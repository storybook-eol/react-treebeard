import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {isArray} from 'lodash';

import defaultAnimations from '../../themes/animations';
import NodeHeader from '../header';
import Drawer from './Drawer';
import Loading from './Loading';

const Li = styled('li', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({style}) => style);
const Ul = styled('ul', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({style}) => style);

class TreeNode extends PureComponent {
    constructor(props) {
        super(props);
        this.velocityRef = React.createRef();
    }

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
        // Merge Any Node Based Decorators Into The Pack
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    renderDrawer(decorators, animations) {
        const {toggled} = this.props.node;
        if (!animations) {
            if (!toggled) {
                return null;
            }
            return this.renderChildren(decorators, animations);
        }

        const {...restAnimationInfo} = animations.drawer;
        return (
            <Drawer restAnimationInfo={{...restAnimationInfo}} reference={this.velocityRef}>
                {toggled ? this.renderChildren(decorators, animations) : null}
            </Drawer>
        );
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
            <Ul style={style.subtree}
                ref={ref => {
                    this.subtreeRef = ref;
                }}>
                {children.map((child, index) => (
                        <TreeNode
                            {...{onToggle, animations, style}}
                            decorators={propDecorators}
                            key={child.id || index}
                            node={child}
                        />
                    )
                )}
            </Ul>
        );
    }

    render() {
        const {node, style} = this.props;
        const decorators = this.decorators();
        const animations = this.animations();

        return (
            <Li innerRef={ref => {
                this.topLevelRef = ref;
            }}
                style={style.base}>
                <NodeHeader {...{decorators, animations, node, style}} onClick={() => this.onClick()}/>
                {this.renderDrawer(decorators, animations)}
            </Li>
        );
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onToggle: PropTypes.func
};

export default TreeNode;
