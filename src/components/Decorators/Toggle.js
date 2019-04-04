import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import {Div} from '../common';

const Polygon = styled('polygon', {
    shouldForwardProp: prop => ['className', 'children', 'points'].indexOf(prop) !== -1
})((({style}) => style));

const Toggle = ({style}) => {
    const {height, width} = style;
    const midHeight = height * 0.5;
    const points = `0,0 0,${height} ${width},${midHeight}`;

    return (
        <Div style={style.base}>
            <Div style={style.wrapper}>
                <svg {...{height, width}}>
                    <Polygon points={points} style={style.arrow}/>
                </svg>
            </Div>
        </Div>
    );
};

Toggle.propTypes = {
    style: PropTypes.object
};

export default Toggle;
