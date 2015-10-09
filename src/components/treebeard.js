'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
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
            },
            loading: {
                animation: { opacity: this.state.toggled ? 1 : 0 },
                duration: 500
            }
        };
    }
    render(){
        return (
            <li>
                {this.renderHeader()}
                {this.renderLoading()}
                <VelocityTransitionGroup enter="slideDown" leave="slideUp">
                    {this.state.toggled ? this.renderChildren() : null}
                </VelocityTransitionGroup>
            </li>
        );
    }
    renderHeader(){
        const anim = this.animations();
        return (
            <a href="#" onClick={this.onClick}>
                <VelocityComponent
                    duration={anim.toggle.duration}
                    animation={anim.toggle.animation}>
                    <div>
                        <i>V</i>
                    </div>
                </VelocityComponent>
                {this.props.node.name}
            </a>
        );
    }
    renderChildren(){
        return (
            <ul>
                {rutils.children.map(this.props.node.children, (child) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        {...this._elements()}
                        key={child.id}
                        node={child}
                    />
                )}
            </ul>
        );
    }
    renderLoading(){
        const anim = this.animations();
        const loadingElement = this.props.loadingElement;
        if(this.props.node.loading && loadingElement){
            return (
                <VelocityComponent
                    animation={anim.loading.animation}
                    duration={anim.loading.duration}>
                    {loadingElement}
                </VelocityComponent>
            );
        }
    }
    _eventBubbles(){
        return { onToggled: this.props.onToggled };
    }
    _elements(){
        return { loadingElement: this.props.loadingElement };
    }
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
    onToggled: React.PropTypes.func,
    animations: React.PropTypes.object,
    loadingElement: React.PropTypes.element
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
                        loadingElement={this.props.nodeLoadingElement}
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
    nodeLoadingElement: React.PropTypes.element
};

TreeBeard.defaultProps = {
    animations: defaultAnimations
};

export default TreeBeard;
