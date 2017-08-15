'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Tree from './tree';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

class TreeBeard extends React.Component {
    render() {
        const {data: propsData, ...props} = this.props;
        let data = propsData;

        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        if (!Array.isArray(data)) {
            data = [data];
        }
        return (
            <Tree {...props}
                  treeRef={ref => this.treeBaseRef = ref}
                  data={data}/>
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
