'use strict';

import React from 'react';
import Radium from 'radium';
import rutils from 'react-utils';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

@Radium
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
        const props = this.props;
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            toggle: anim.toggle(this.state),
            children: anim.children(this.state)
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
            <li style={this.props.style.base}>
                {this.renderHeader(decorators, animations)}
                {toggled ? this.renderChildren(decorators, animations) : null}
            </li>
        );
    }
    renderHeader(decorators, animations){
        const style = this.props.style;
        const terminal = this.props.node.terminal;
        const active = this.props.node.active;
        let linkStyle = [style.link, active ? style.activeLink : null];
        return (
            <a href="#" onClick={this.onClick} style={linkStyle}>
                { !terminal ? this.renderToggle(decorators, animations) : '' }
                <decorators.Header
                    name={this.props.node.name}
                    style={style.header}
                />
            </a>
        );
    }
    renderToggle(decorators, animations){
        const Toggle = decorators.Toggle;
        const style = this.props.style;
        return (
            <VelocityComponent
                duration={animations.toggle.duration}
                animation={animations.toggle.animation}>
                <Toggle style={style.toggle}/>
            </VelocityComponent>
        );
    }
    renderChildren(decorators, animations){
        const childAnimations = animations.children;
        return (
            <ul style={this.props.style.subtree}>
                <VelocityTransitionGroup
                    enter={childAnimations.enter}
                    leave={childAnimations.leave}
                    runOnMount={true}>
                    {this.renderLoading(decorators)}
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
                </VelocityTransitionGroup>
            </ul>
        );
    }
    renderLoading(){
        const Loading = this.props.decorators.Loading;
        if(this.props.node.loading && Loading){
            return (
                <li>
                    <Loading style={this.props.style.loading}/>
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
