'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

import defaultDecorators from './decorators';
import defaultTheme from '../../themes/default';
import defaultAnimations from '../../themes/animations';

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.state = { toggled: props.node.toggled };
        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(props){
        let toggled = props.node.toggled;
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
        const animations = this.props.animations;
        return {
            toggle: animations.toggle(this.state),
            children: animations.children(this.state)
        };
    }
    render(){
        const animations = this.animations();
        let childAnimations = animations.children;
        return (
            <li style={this.props.style.base}>
                {this.renderHeader(animations)}
                <VelocityTransitionGroup
                    enter={childAnimations.enter}
                    leave={childAnimations.leave}>
                    {this.state.toggled ? this.renderChildren() : null}
                </VelocityTransitionGroup>
            </li>
        );
    }
    renderHeader(animations){
        const decorators = this.props.decorators;
        const style = this.props.style;
        const terminal = this.props.node.terminal;
        return (
            <a href="#" onClick={this.onClick}>
                { !terminal ? this.renderToggle(animations) : '' }
                <decorators.Header name={this.props.node.name} style={style.header}/>
            </a>
        );
    }
    renderToggle(animations){
        const decorators = this.props.decorators;
        const style = this.props.style;
        return (
            <VelocityComponent
                duration={animations.toggle.duration}
                animation={animations.toggle.animation}>
                <decorators.Toggle style={style.toggle}/>
            </VelocityComponent>
        );
    }
    renderChildren(){
        return (
            <ul style={this.props.style.subtree}>
                {this.renderLoading()}
                {rutils.children.map(this.props.node.children, (child) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={child.id}
                        node={child}
                        decorators={this.props.decorators}
                        animations={this.props.animations}
                        style={this.props.style}
                    />
                )}
            </ul>
        );
    }
    renderLoading(){
        const Loading = this.props.decorators.Loading;
        if(this.props.node.loading && Loading){
            return (
                <li>
                    <Loading/>
                </li>
            );
        }
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
    onToggle: React.PropTypes.func
};

TreeNode.defaultProps = {
};

class TreeBeard extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <ul style={this.props.style.tree.base}>
                    <TreeNode
                        node={this.props.data}
                        onToggle={this.props.onToggle}
                        animations={this.props.animations}
                        decorators={this.props.decorators}
                        style={this.props.style.tree.node}
                    />
                </ul>
            </div>
        );
    }
}

TreeBeard.propTypes = {
    style: React.PropTypes.object,
    data: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    decorators: React.PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default TreeBeard;
