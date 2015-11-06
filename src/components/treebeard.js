'use strict';

import React from 'react';
import Radium from 'radium';
import rutils from 'react-utils';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

@Radium
class NodeHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {style, animations, decorators} = this.props;
        const terminal = this.props.node.terminal;
        const active = this.props.node.active;
        const linkStyle = [style.link, active ? style.activeLink : null];
        return (
            <a href="#" onClick={this.props.onClick} style={linkStyle}>
                { !terminal ? this.renderToggle(decorators, animations) : '' }
                <decorators.Header
                    node={this.props.node}
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
}

NodeHeader.propTypes = {
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    node: React.PropTypes.object.isRequired
};

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
            <li style={this.props.style.base}>
                {this.renderHeader(decorators, animations)}
                <VelocityTransitionGroup {...animations.drawer}>
                    {toggled ? this.renderChildren(decorators, animations) : null}
                </VelocityTransitionGroup>
            </li>
        );
    }
    renderHeader(decorators, animations){
        return (
            <NodeHeader
                decorators={decorators}
                animations={animations}
                style={this.props.style}
                node={this.props.node}
                onClick={this.onClick}
            />
        );
    }
    renderChildren(decorators){
        return (
            <ul style={this.props.style.subtree}>
                {this.renderLoading(decorators)}
                {rutils.children.map(this.props.node.children, (child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={index}
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
