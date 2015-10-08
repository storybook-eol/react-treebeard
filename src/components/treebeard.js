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
            }
        };
    }
    render(){
        const node = this.props.node;
        const animations = this.animations();
        return (
            <li>
                <a href="#" onClick={this.onClick}>
                    {node.name}
                </a>
                <VelocityComponent
                    animation={animations.children.animation}
                    duration={animations.children.duration}>
                    <ul>
                        {rutils.children.map(node.children, (child) =>
                            <TreeNode {...this._eventBubbles()}
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
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
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
                    />
                </ul>
            </div>
        );
    }
}

TreeBeard.propTypes = {
    data: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object,
    onToggled: React.PropTypes.func
};

TreeBeard.defaultProps = {
    animations: defaultAnimations
};

export default TreeBeard;
