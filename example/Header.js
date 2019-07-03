import React from 'react';
import PropTypes from 'prop-types';

import {Div} from '../src/components/common';

// Example: Customising The Header Decorator To Include Icons
const Header = ({style, node, onClick}) => {
    const iconType = node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = {marginRight: '5px'};

    return (
        <Div style={style.base} onClick={() => onClick()}>
            <Div style={style.title}>
                <i className={iconClass} style={iconStyle}/>

                {node.name}
            </Div>
        </Div>
    );
};

Header.propTypes = {
    node: PropTypes.object,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

export default Header;
