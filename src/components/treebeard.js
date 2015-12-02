'use strict';

import React from 'react';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

class TreeBeard extends React.Component {
    constructor(props){
        super(props);
    }
    keyGetter(node, index){
        let {keyField} = this.props;
        if(!keyField){
            return index;
        }
        else if(typeof keyField === 'function'){
            return keyField(node);
        }
        return node[keyField];
    }
    childrenGetter(node){
        let {childrenField} = this.props;
        if(typeof childrenField === 'function'){
            return childrenField(node);
        }
        return node[childrenField];
    }
    render(){
        let {data} = this.props;
        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        if(!Array.isArray(data)){ data = [data]; }
        return (
            <ul style={this.props.style.tree.base} ref="treeBase">
                {data.map((node, index) =>
                    <TreeNode
                        key={this.keyGetter(node, index)}
                        node={node}
                        onToggle={this.props.onToggle}
                        animations={this.props.animations}
                        decorators={this.props.decorators}
                        style={this.props.style.tree.node}
                        childrenGetter={this.childrenGetter.bind(this)}
                        keyGetter={this.keyGetter.bind(this)}
                    />
                )}
            </ul>
        );
    }
}

TreeBeard.propTypes = {
    style: React.PropTypes.object,
    data: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    animations: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    decorators: React.PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators,
    childrenField: 'children'
};

export default TreeBeard;
