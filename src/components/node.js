'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityTransitionGroup} from 'velocity-react';
import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.state = { toggled: props.node.toggled };
        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(props){
        let toggled = props.toggledGetter(props.node);
        if(toggled !== undefined){
            this.setState({ toggled });
        }
    }
    onClick(){
        let toggled = !this.state.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
        this.setState({ toggled: toggled });
    }
    animations(){
        const props = this.props;
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            toggle: anim.toggle(this.state),
            drawer: anim.drawer(this.state)
        };
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    render(){
        const decorators = this.decorators();
        const animations = this.animations();
        const toggled = this.state.toggled;
        return (
            <li style={this.props.style.base} ref="topLevel">
                {this.renderHeader(decorators, animations)}
                <VelocityTransitionGroup {...animations.drawer} ref="velocity">
                    {toggled ? this.renderChildren(decorators, animations) : null}
                </VelocityTransitionGroup>
            </li>
        );
    }
    renderHeader(decorators, animations){
        if(this.props.renderNode){
            return this.props.renderNode(this.props, this.onClick, decorators, animations);
        }
        return (
            <NodeHeader
                hasChildren={!!this.props.childrenGetter(this.props.node)}
                decorators={decorators}
                animations={animations}
                style={this.props.style}
                node={this.props.node}
                onClick={this.onClick}
            />
        );
    }
    renderChildren(decorators){
        const {keyGetter, childrenGetter, toggledGetter} = this.props;
        if(this.props.node.loading){ return this.renderLoading(decorators); }
        return (
            <ul style={this.props.style.subtree} ref="subtree">
                {rutils.children.map(childrenGetter(this.props.node), (child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={keyGetter(child, index)}
                        keyGetter={keyGetter}
                        childrenGetter={childrenGetter}
                        toggledGetter={toggledGetter}
                        node={child}
                        decorators={this.props.decorators}
                        animations={this.props.animations}
                        renderNode={this.props.renderNode}
                        style={this.props.style}
                    />
                )}
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul style={this.props.style.subtree}>
                <li>
                    <decorators.Loading style={this.props.style.loading}/>
                </li>
            </ul>
        );
    }
    _eventBubbles(){
        return { onToggle: this.props.onToggle };
    }
}

TreeNode.propTypes = {
    style: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func,
    childrenGetter: React.PropTypes.func.isRequired,
    keyGetter: React.PropTypes.func.isRequired,
    toggledGetter: React.PropTypes.func.isRequired
};

export default TreeNode;
