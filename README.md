# react-treebeard

[![Build Status](https://travis-ci.org/alexcurtis/react-treebeard.svg?branch=master)](https://travis-ci.org/alexcurtis/react-treebeard) [![Coverage Status](https://img.shields.io/coveralls/alexcurtis/react-treebeard.svg)](https://coveralls.io/r/alexcurtis/react-treebeard?branch=master)


React Tree View Component. Fast, Efficient and Customisable.

### Install

```
npm install react-treebeard --save
```

### [Example](http://alexcurtis.github.io/react-treebeard/)

An online example from the `/example` directory can be found here: [Here](http://alexcurtis.github.io/react-treebeard/)

### Quick Start
```javascript
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Treebeard from 'react-treebeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                {
                    name: 'child',
                    terminal: true
                }
            ]
        },
        {
            name: 'loading parent',
            loading: true
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        {
                            name: 'nested child',
                            terminal: true
                        }
                    ]
                }
            ]
        }
    ]
};

class TreeExample extends React.Component {
    constructor(props){
        super(props);
    }
    onToggle(/* node, toggled */){
        // ...
    }
    render(){
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
            />
        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<TreeExample/>, content);
```

### Prop Values

#### data
`React.PropTypes.object.isRequired`

Data that drives the tree view. State-driven effects can be built by manipulating the attributes in this object. An example can be found in `example/data.js`

#### onToggle
`React.PropTypes.func`

Callback function when a node is toggled / clicked. Passes 2 attributes: the data node and it's toggled boolean state.

#### style
`React.PropTypes.object`

Sets the treeview styling. Defaults to `src/themes/default`.

#### animations
`React.PropTypes.object`

Sets the treeview animations. See [velocity-react](https://github.com/twitter-fabric/velocity-react) for more details. Defaults to `src/themes/animations`.

#### decorators
`React.PropTypes.object`

Decorates the treeview. Here you can use your own Node Header, Toggle and Loading components. Defaults to `src/decorators`. See example below:

```javascript
let decorators = {
    Loading: (props) => {
        return (
            <div style={props.style}>
                loading...
            </div>
        );
    },
    Toggle: (props) => {
        return (
            <div style={props.style}>
                <svg height={props.height} width={props.width}>
                    // Vector Toggle Here
                </svg>
            </div>
        );
    },
    Header: (props) => {
        return (
            <div style={props.style}>
                {props.node.name}
            </div>
        );
    }
};

<Treebeard data={...} decorators={decorators}/>
```

### Data Attributes

```javascript
{
    name: 'string',
    children: 'array',
    loading: 'boolean',
    terminal: 'boolean',
    decorators: 'object',
    animations: 'object'
},
```
#### name
The name prop passed into the Header component.

#### children
The children attached to the node. This value populates the subtree at the specific node. Each child is built from the same basic data structure.

#### loading
Loading flag. It will populate the treeview with the loading component. Useful when asynchronously pulling the data into the treeview.

#### terminal
Terminates the node. There is no more data to load into the subtree. A Toggle will not be rendered. This is the end of the path.

#### decorators / animations
Attach specific decorators / animations to a node. Provides the low level functionality to create visuals on a node-by-node basis. These structures are the same as the top level props, described above.
