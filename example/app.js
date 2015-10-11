'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Treebeard from '../src/index';

import movies from './movies';

class MovieTree extends React.Component {
    constructor(props){
        super(props);
    }
    onToggle(node, toggled){
        // Store Toggle State
        node.toggled = toggled;
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
