import React from 'react';
import PropTypes from 'prop-types';

import {Div} from '../common';

const Header = ({node, style}) => (
    <Div style={style.base}>
        <Div style={style.title}>
            {node.name}
        </Div>
    </Div>
);

Header.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired
};

export default Header;
