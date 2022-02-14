# react-treebeard

[![Build Status](https://travis-ci.org/storybookjs/react-treebeard.svg?branch=master)](https://travis-ci.org/storybookjs/react-treebeard) [![Coverage Status](https://coveralls.io/repos/storybookjs/react-treebeard/badge.svg?branch=master&service=github)](https://coveralls.io/github/storybookjs/react-treebeard?branch=master)

React Tree View Component. Data-Driven, Fast, Efficient and Customisable.

### Install

```
npm install react-treebeard --save
```

### [Example](http://storybookjs.github.io/react-treebeard/)

An online example from the `/example` directory can be found here: [Here](http://storybookjs.github.io/react-treebeard/)

### Quick Start
```javascript
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

class TreeExample extends PureComponent {
    constructor(props){
        super(props);
        this.state = {data};
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle(node, toggled){
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }
    
    render(){
        const {data} = this.state;
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

If you use react-hooks you should do something like this:
```javascript
import React, {useState} from 'react';
const TreeExample = () => {
    const [data, setData] = useState(data);
    const [cursor, setCursor] = useState(false);
    
    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data))
    }
    
    return (
       <Treebeard data={data} onToggle={onToggle}/>
    )
}

const content = document.getElementById('content');
ReactDOM.render(<TreeExample/>, content);
```

### Prop Values

#### data
`PropTypes.oneOfType([PropTypes.object,PropTypes.array]).isRequired`

Data that drives the tree view. State-driven effects can be built by manipulating the attributes in this object. Also supports an array for multiple nodes at the root level. An example can be found in `example/data.js`

#### onToggle
`PropTypes.func`

Callback function when a node is toggled / clicked. Passes 2 attributes: the data node and it's toggled boolean state.

#### style
`PropTypes.object`

Sets the treeview styling. Defaults to `src/themes/default`.

#### animations
`PropTypes.oneOfType([PropTypes.object, PropTypes.bool])`

Sets the treeview animations. Set to `false` if you want to turn off animations. See [velocity-react](https://github.com/twitter-fabric/velocity-react) for more details. Defaults to `src/themes/animations`.

#### decorators
`PropTypes.object`

Decorates the treeview. Here you can use your own Container, Header, Toggle and Loading components. Defaults to `src/decorators`. See example below:

```javascript
const decorators = {
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
    },
    Container: (props) => {
        return (
            <div onClick={this.props.onClick}>
                // Hide Toggle When Terminal Here
                <this.props.decorators.Toggle/>
                <this.props.decorators.Header/>
            </div>
        );
    }
};

<Treebeard data={...} decorators={decorators}/>
```

#### makeKeyProp
Optional prop to generate your own [React key props](https://reactjs.org/docs/lists-and-keys.html). Function that takes the node as the only param. Example:
```jsx
<Treebeard
    data={data}
    onToggle={this.onToggle}
    onSelect={this.onSelect}
    makeKeyProp={(node) => node.yourUniqueId}
/>
```

### Data Attributes

```javascript
{
    id: '[optional] string',
    name: 'string',
    children: '[optional] array',
    toggled: '[optional] boolean',
    active: '[optional] boolean',
    loading: '[optional] boolean',
    decorators: '[optional] object',
    animations: '[optional] object'
},
```
#### id
The component key. If not defined, an auto-generated index is used.

#### name
The name prop passed into the Header component.

#### children
The children attached to the node. This value populates the subtree at the specific node. Each child is built from the same basic data structure. Tip: Make this an empty array, if you want to asynchronously load a potential parent.

#### toggled
Toggled flag. Sets the visibility of a node's children. It also sets the state for the toggle decorator.

#### active
Active flag. If active, the node will be highlighted. The highlight is derived from the `node.activeLink` style object in the theme.

#### loading
Loading flag. It will populate the treeview with the loading component. Useful when asynchronously pulling the data into the treeview.

#### decorators / animations
Attach specific decorators / animations to a node. Provides the low level functionality to create visuals on a node-by-node basis. These structures are the same as the top level props, described above.
