# react-treebeard

Fast, Efficient and Customisable Tree View React Component

### Install

```
npm install react-treebeard --save
```

### Example
```javascript
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Treebeard from 'react-treebeard';

const data = {
    id: 0,
    name: 'root',
    toggled: true,
    children: [
        {
            id: 1,
            name: 'parent',
            children: [
                {
                    id: 2,
                    name: 'child',
                    terminal: true
                }
            ]
        },
        {
            id: 3,
            name: 'loading parent',
            loading: true
        },
        {
            id: 4,
            name: 'parent',
            children: [
                {
                    id: 5,
                    name: 'nested parent',
                    children: [
                        {
                            id: 6,
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
