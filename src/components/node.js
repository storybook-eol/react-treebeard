'use strict';

import React, { Component } from 'react';
import rutils from 'react-utils';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

class TreeNode extends Component {
    constructor(props){
        super(props);
    }
    onClick = () =>{
        let toggled = !this.props.node.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
    }
    animations(){
        const props = this.props;
        if(props.animations === false){ return false; }
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const { decorators, node } = this.props;
        const nodeDecorators = node.decorators || {};

        return {...decorators, ...nodeDecorators};
    }
    render(){
        const decs = this.decorators();
        const anims = this.animations();

        const { style } = this.props;
        return (
            <li style={style.base} ref="topLevel">
                {this.renderHeader(decs, anims)}
                {this.renderDrawer(decs, anims)}
            </li>
        );
    }
    renderDrawer(decorators, animations){
        const toggled = this.props.node.toggled;
        if(!animations && !toggled){ return null; }
        if(!animations && toggled){
            return this.renderChildren(decorators, animations);
        }

        return (
            <VelocityTransitionGroup {...animations.drawer} ref="velocity">
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }
    renderHeader(decorators, animations){
        return (
            <NodeHeader
                decoratorProps={this.props.decoratorProps}
                decorators={decorators}
                animations={animations}
                style={this.props.style}
                node={{...this.props.node}}
                onClick={this.onClick}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading){ return this.renderLoading(decorators); }

        return (
            <ul style={this.props.style.subtree} ref="subtree">
                {rutils.children.map(this.props.node.children, (child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={child.id || index}
                        node={child}
                        decorators={this.props.decorators}
                        decoratorProps={this.props.decoratorProps}
                        animations={this.props.animations}
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
                    <decorators.Loading style={this.props.style.loading} { ...this.props.decoratorProps }/>
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
    decoratorProps: React.PropTypes.object,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]).isRequired,
    onToggle: React.PropTypes.func
};

export default TreeNode;
