import React from 'react';
import PropTypes from 'prop-types';

import {Div} from '../common';

const Header = ({node, style, onClick}) => (
    <Div style={style.base} onClick={onClick ? () => onClick() : null}>
        <Div style={style.title}>
            {node.name}
        </Div>
    </Div>
);

Header.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default Header;
