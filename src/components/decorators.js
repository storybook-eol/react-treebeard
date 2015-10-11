'use strict';

import React from 'react';

const Loading = () => {
    return (
        <div>loading...</div>
    );
};

const Toggle = (props) => {
    const style = props.style;
    const height = style.height;
    const width = style.width;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div style={style.base}>
            <svg height={height} width={width}>
                <polygon
                    points={points}
                    style={style.arrow}
                />
            </svg>
        </div>
    );
};

const Header = (props) => {
    const style = props.style;
    return (
        <div style={style.base}>
            <div style={style.title}>
                {props.name}
            </div>
        </div>
    );
};

export default {
    Loading,
    Toggle,
    Header
};
