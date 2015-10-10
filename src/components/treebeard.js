'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
import decorators from './decorators';
import defaultAnimations from '../../themes/animations';

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.state = { toggled: false };
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        var onToggled = this.props.onToggled;
        if(onToggled){ onToggled(this.props.node); }
        this.setState({ toggled: !this.state.toggled });
    }
    animations(){
        return {
            toggle: {
                animation: {
                    rotateX: this.state.toggled ? 180 : 0,
                    transformOriginY: ['42%', '42%']
                },
                duration: 300
            }
        };
    }
    render(){
        return (
            <li>
                {this.renderHeader()}
                <VelocityTransitionGroup enter="slideDown" leave="slideUp">
                    {this.state.toggled ? this.renderChildren() : null}
                </VelocityTransitionGroup>
            </li>
        );
    }
    renderHeader(){
        const decs = this.props.decorators;
        const Node = <decs.Node name={this.props.node.name}/>;
        if(this.props.node.end){ return Node; }
        const anim = this.animations();
        return (
            <a href="#" onClick={this.onClick}>
                <VelocityComponent
                    duration={anim.toggle.duration}
                    animation={anim.toggle.animation}>
                    {decs.Toggle}
                </VelocityComponent>
                {Node}
            </a>
        );
    }
    renderChildren(){
        return (
            <ul>
                {this.renderLoading()}
                {rutils.children.map(this.props.node.children, (child) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={child.id}
                        node={child}
                        decorators={this.props.decorators}
                    />
                )}
            </ul>
        );
    }
    renderLoading(){
        const loadingElement = this.props.decorators.Loading;
        if(this.props.node.loading && loadingElement){
            return (<li>{loadingElement}</li>);
        }
    }
    _eventBubbles(){
        return { onToggled: this.props.onToggled };
    }
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    onToggled: React.PropTypes.func,
    animations: React.PropTypes.object
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
                <ul>
                    <TreeNode
                        node={this.props.data}
                        onToggled={this.props.onToggled}
                        animations={this.props.animations}
                        decorators={this.props.decorators}
                    />
                </ul>
            </div>
        );
    }
}

TreeBeard.propTypes = {
    data: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object,
    onToggled: React.PropTypes.func,
    decorators: React.PropTypes.object
};

TreeBeard.defaultProps = {
    animations: defaultAnimations,
    decorators: decorators
};

export default TreeBeard;
