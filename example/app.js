'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Treebeard from '../src/index';

import data from './data';
import styles from './styles';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

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
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onSubTreeToggled(node, toggled){
        // Store Toggle State
        node.toggled = toggled;
    }
    onTerminalClicked(node){
        console.log('terminal = ', node);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.terminal){ this.onTerminalClicked(node); }
        else { this.onSubTreeToggled(node, toggled); }
        this.setState({ cursor: node });
    }
    render(){
        return (
            <div>
                <div style={styles.component}>
                    <Treebeard data={data} onToggle={this.onToggle}/>
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
