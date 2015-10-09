'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Treebeard from '../src/index';

import movies from './movies';

class MovieTree extends React.Component {
    constructor(props){
        super(props);
    }
    onToggled(node){
        console.log(node);
    }
    render(){
        return (
            <Treebeard
                data={movies}
                onToggled={this.onToggled}
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
