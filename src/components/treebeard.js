'use strict';

import React from 'react';
import rutils from 'react-utils';

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
        // add some cool animations ... maybe using react-velocity or something.
    }
    render(){
        const node = this.props.node;
        return (
            <li>
                <a href="#" onClick={this.onClick}>
                    {node.name}
                </a>
                <ul style={{opacity: this.state.toggled ? 1 : 0}}>
                    {rutils.children.map(node.children, (child) =>
                        <TreeNode {...this._eventBubbles()}
                            key={child.id}
                            node={child}
                        />
                    )}
                </ul>
            </li>
        );
    }
    _eventBubbles(){
        return { onToggled: this.props.onToggled };
    }
}

TreeNode.propTypes = {
    node: React.PropTypes.object.isRequired,
    onToggled: React.PropTypes.func
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
                    />
                </ul>
            </div>
        );
    }
}

TreeBeard.propTypes = {
    data: React.PropTypes.object.isRequired,
    onToggled: React.PropTypes.func
};

TreeBeard.defaultProps = {
};

export default TreeBeard;
