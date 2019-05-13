import React from 'react';
import PropTypes from 'prop-types';

import {Div} from '../src/components/common';
import styles from './styles';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

const NodeViewer = ({node}) => {
    const style = styles.viewer;
    let json = JSON.stringify(node, null, 4);

    if (!json) {
        json = HELP_MSG;
    }

    return <Div style={style.base}>{json}</Div>;
};

NodeViewer.propTypes = {
    node: PropTypes.object
};

export default NodeViewer;
