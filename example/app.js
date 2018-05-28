/* eslint-disable */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
import update from 'immutability-helper';
import {Treebeard, decorators} from '../src/index';

import data from './data';
import styles from './styles';
import * as filters from './filter';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

// Example: Customising The Header Decorator To Include Icons
decorators.Header = ({style, node}) => {
    const iconType = node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = {marginRight: '5px'};

    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>

                {node.name}
            </div>
        </div>
    );
};

class NodeViewer extends React.Component {
    render() {
        const style = styles.viewer;
        let json = JSON.stringify(this.props.node, null, 4);

        if (!json) {
            json = HELP_MSG;
        }

        return <div style={style.base}>{json}</div>;
    }
}
NodeViewer.propTypes = {
    node: PropTypes.object
};

function buildUpdatePattern(path, value) {
    const pattern = {};
    const tmp = path.reduce((acc, p) => {
        acc[p] = {};
        return acc[p];
    }, pattern)
    tmp['$set'] = value;
    return pattern;
}

class DemoTree extends React.Component {
    constructor() {
        super();

        this.state = {data};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled, indexPath) {
        this.setState((prevState) => {
            let data = prevState.data
            if (this.prevIndexPath) {
              data = update(data, buildUpdatePattern(this.prevIndexPath.concat(['active']), false));
            }
            data = update(data, buildUpdatePattern(indexPath.concat(['active']), true));
            if (node.children) {
              data = update(data, buildUpdatePattern(indexPath.concat(['toggled']), toggled));
            }
            return { data, cursor: node }
        }, () => {
            this.prevIndexPath = indexPath
        });
    }

    onFilterMouseUp(e) {
        const filter = e.target.value.trim();
        if (!filter) {
            return this.setState({data});
        }
        var filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({data: filtered});
    }

    render() {
        const {data: stateData, cursor} = this.state;

        return (
            <StyleRoot>
                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-search"/>
                        </span>
                        <input className="form-control"
                               onKeyUp={this.onFilterMouseUp.bind(this)}
                               placeholder="Search the tree..."
                               type="text"/>
                    </div>
                </div>
                <div style={styles.component}>
                    <Treebeard data={stateData}
                               decorators={decorators}
                               onToggle={this.onToggle}/>
                </div>
                <div style={styles.component}>
                    <NodeViewer node={cursor}/>
                </div>
            </StyleRoot>
        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
