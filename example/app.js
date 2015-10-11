'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Treebeard from '../src/index';

import movies from './movies';

class MovieTree extends React.Component {
    constructor(props){
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }
    onParentToggled(node, toggled){
        // Store Toggle State
        node.toggled = toggled;
    }
    onTerminalClicked(node){
        console.log('terminal = ', node);
    }
    onToggle(node, toggled){
        if(!node.terminal){ this.onParentToggled(node, toggled); }
        else { this.onTerminalClicked(node); }
    }
    render(){
        return (
            <Treebeard
                data={movies}
                onToggle={this.onToggle}
            />
        );
    }
}

MovieTree.propTypes = {
};

MovieTree.defaultProps = {
};

const content = document.getElementById('content');
ReactDOM.render(<MovieTree/>, content);
