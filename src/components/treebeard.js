'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityComponent} from 'velocity-react';
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
            children: {
                animation: { opacity: this.state.toggled ? 1 : 0 },
                duration: 500
            },
            loading: {
                animation: { opacity: this.state.toggled ? 1 : 0 },
                duration: 500
            }
        };
    }
    renderLoading(animations){
        const loadingElement = this.props.loadingElement;
        if(this.props.node.loading && loadingElement){
            return (
                <VelocityComponent
                    animation={animations.loading.animation}
                    duration={animations.loading.duration}>
                    {loadingElement}
                </VelocityComponent>
            );
        }
    }
    render(){
        const node = this.props.node;
        const anim = this.animations();
        return (
            <li>
                <a href="#" onClick={this.onClick}>
                    {node.name}
                </a>
                {this.renderLoading(anim)}
                <VelocityComponent
                    animation={anim.children.animation}
                    duration={anim.children.duration}>
                    <ul>
                        {rutils.children.map(node.children, (child) =>
                            <TreeNode
                                {...this._eventBubbles()}
                                {...this._elements()}
                                key={child.id}
                                node={child}
                            />
                        )}
                    </ul>
                </VelocityComponent>
            </li>
        );
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
