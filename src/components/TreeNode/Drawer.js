import React from 'react';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';

const Drawer = ({restAnimationInfo, children, ref}) => (
    <VelocityTransitionGroup
        {...restAnimationInfo}
        ref={ref}
    >
        {children}
    </VelocityTransitionGroup>
);

Drawer.propTypes = {
    restAnimationInfo: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func, PropTypes.object),
        PropTypes.object
    ]),
    ref: PropTypes.func.isRequired
};

export default Drawer;
