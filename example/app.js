'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Treebeard from '../src/index';

import movies from './movies';

class MovieTree extends React.Component {
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
