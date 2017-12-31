'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {cloneDeep, get, set} from 'lodash';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

const getFromData = (data, nodePath) => {
    if (!nodePath) {
        return;
    }
    if (!nodePath.length) {
        return data;
    }
    return get(data, nodePath);
};

const makeNewData = (oldData, nodePath, nodeDiff) => {
    if (!nodePath) {
        return;
    }
    if (!nodePath.length) {
        return Object.assign({}, oldData, nodeDiff);
    }
    return set(cloneDeep(oldData), nodePath, Object.assign({}, get(oldData, nodePath), nodeDiff));
};

class TreeBeard extends React.Component {
    render() {
        const {animations, decorators, data: propsData, onToggle, style} = this.props;
        let data = propsData;

        // Support Multiple Root Nodes. It's not formally a tree, but it's a use-case.
        const isDataArray = Array.isArray(propsData);
        if (!isDataArray) {
            data = [data];
        }

        return (
            <ul style={style.tree.base}
                ref={ref => this.treeBaseRef = ref}>
                {data.map((node, index) =>
                    <TreeNode animations={animations}
                              decorators={decorators}
                              key={node.id || index}
                              node={node}
                              nodePath={isDataArray ? [String(index)] : []}
                              onToggle={onToggle}
                              style={style.tree.node}/>
                )}
            </ul>
        );
    }
}

TreeBeard.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    decorators: PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default TreeBeard;
export {getFromData, makeNewData};
