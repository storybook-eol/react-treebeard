'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import {Treebeard, decorators} from '../src/index';

import data from './data';
import styles from './styles';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

// Helper functions for filtering
var defaultMatcher = (filterText, node) => {
    return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

var nodeMatchesOrHasMatchingDescendants = (node, filter, matcher) => {
    return matcher(filter, node) || // i match
        (node.children && // or i have decendents and one of them match
        node.children.length &&
        !!node.children.find(childNode => nodeMatchesOrHasMatchingDescendants(childNode, filter, matcher)));
};

var filterTree = (node, filter, matcher = defaultMatcher) => {
    if(matcher(filter, node)){ // if im an exact match then all my children get to stay
        return node;
    }
    // if not then only keep the ones that match or have matching descendants
    var filteredChildren;

    if(node.children) {
        filteredChildren = node.children.filter(child => nodeMatchesOrHasMatchingDescendants(child, filter, matcher));
    }

    if(filteredChildren && filteredChildren.length){
        filteredChildren = filteredChildren.map(child => filterTree(child, filter, matcher));
    }

    return Object.assign({}, node, {
        children: filteredChildren
    });
};

var expandNodesWithMatchingDescendants = (node, filter, matcher = defaultMatcher) => {
    var children = node.children;
    var shouldExpand = false;

    if(children && children.length){
        var childrenWithMatches = node.children.filter(child => nodeMatchesOrHasMatchingDescendants(child, filter, matcher));
        shouldExpand = !!childrenWithMatches.length; // I expand if any of my kids match

        if(shouldExpand) {// if im going to expand
            // go through all the matches and see if thier children need to expand
            children = childrenWithMatches.map(child => expandNodesWithMatchingDescendants(child, filter, matcher));
        }
    }

    return Object.assign({}, node, {children: children, toggled: shouldExpand});
};
// end of helper functions

// Example: Customising The Header Decorator To Include Icons
decorators.Header = (props) => {
    const style = props.style;
    const iconType = props.node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: '5px' };
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {props.node.name}
            </div>
        </div>
    );
};

class NodeViewer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const style = styles.viewer;
        let json = JSON.stringify(this.props.node, null, 4);
        if(!json){ json = HELP_MSG; }
        return (
            <div style={style.base}>
                {json}
            </div>
        );
    }
}

NodeViewer.propTypes = {
    node: React.PropTypes.object
};

@Radium
class DemoTree extends React.Component {
    constructor(props){
        super(props);
        this.state = {data};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    onFilterMouseUp(e){
        const filter = e.target.value.trim();

        if(filter){
            var filtered = filterTree(data, filter);
            filtered = expandNodesWithMatchingDescendants(filtered, filter);

            this.setState({data: filtered});
        }
        else {
            this.setState({data});
        }
    }

    render(){
        return (
            <div>
                <input onKeyUp={this.onFilterMouseUp.bind(this)} />
                <div style={styles.component}>
                    <Treebeard
                        data={this.state.data}
                        onToggle={this.onToggle}
                        decorators={decorators}
                    />
                </div>
                <div style={styles.component}>
                    <NodeViewer node={this.state.cursor}/>
                </div>
            </div>

        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
