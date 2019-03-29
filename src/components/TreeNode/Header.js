import React from 'react';
import PropTypes from 'prop-types';

import NodeHeader from '../header';

const Header = ({animations, decorators, style, node, onClick}) => (
    <NodeHeader {...{animations, decorators, style, onClick, node}}/>
);

Header.propTypes = {
    onClick: PropTypes.func.isRequired,
    animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired
};

export default Header;
