import React from 'react';
import PropTypes from 'prop-types';
import {castArray} from 'lodash';

import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import {makeKeyProp} from '../util';
import {Ul} from './common';
import defaultDecorators from './Decorators';
import TreeNode from './TreeNode';

const TreeBeard = ({
    animations, decorators, data, onToggle, style, onSelect, customStyles, makeKeyProp
}) => (
    <Ul style={{...defaultTheme.tree.base, ...style.tree.base}}>
        {castArray(data).map(node => (
            <TreeNode
                decorators={decorators}
                node={node}
                onToggle={onToggle}
                animations={animations}
                onSelect={onSelect}
                customStyles={customStyles}
                makeKeyProp={makeKeyProp}
                key={makeKeyProp(node)}
                style={{...defaultTheme.tree.node, ...style.tree.node}}
            />
        ))}
    </Ul>
);

TreeBeard.propTypes = {
    style: PropTypes.object,
    customStyles: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
    decorators: PropTypes.object,
    makeKeyProp: PropTypes.func
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators,
    customStyles: {},
    makeKeyProp
};

export default TreeBeard;
