'use strict';

import React from 'react';

const Loading = () => {
    return (
        <div>loading...</div>
    );
};

const Toggle = (props) => {
    const height = props.height;
    const width = props.width;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div style={{display: 'inline-block'}}>
            <svg height={height} width={width}>
                <polygon
                    points={points}
                    style={props.arrow}
                />
            </svg>
        </div>
    );
};

const Node = (props) => {
    return (
        <div>
            {props.name}
        </div>
    );
};

export default {
    Loading,
    Toggle,
    Node
};
