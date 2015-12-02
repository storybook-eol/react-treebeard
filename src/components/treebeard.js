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
    render(){
        let {data} = this.props;
        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        if(!Array.isArray(data)){ data = [data]; }

        // Compose children, key and toggled getters
        const getters = {
            childrenGetter: node=>Getter(node, this.props.childrenField),
            keyGetter: (node, index)=>Getter(node, this.props.keyField, index),
            toggledGetter: node=>Getter(node, this.props.childrenField)
        }

        return (
            <ul style={this.props.style.tree.base} ref="treeBase">
                {data.map((node, index) =>
                    <TreeNode
                        key={getters.keyGetter(node, index)}
                        node={node}
                        onToggle={this.props.onToggle}
                        animations={this.props.animations}
                        decorators={this.props.decorators}
                        style={this.props.style.tree.node}
                        {...getters}
                    />
                )}
            </ul>
        );
    }
}

// Helper: Get value by function or property name
function Getter(node, field, defaultValue){
    if(!field){
        return defaultValue;
    }
    else if(typeof field === 'function'){
        return field(node);
    }
    return node[field];
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
    childrenField: 'children',
    toggledField: 'toggled'
};

export default TreeBeard;
