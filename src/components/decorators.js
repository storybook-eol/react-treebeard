'use strict';

import React from 'react';

const Loading = (props) => {
    return (
        <div style={props.style}>
            loading...
        </div>
    );
};

Loading.propTypes = {
    style: React.PropTypes.object
};

const Toggle = (props) => {
    const style = props.style;
    const height = style.height;
    const width = style.width;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div style={style.base}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon
                        points={points}
                        style={style.arrow}
                    />
                </svg>
            </div>
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

Header.propTypes = {
    name: React.PropTypes.string.isRequired
};

export default {
    Loading,
    Toggle,
    Header
};
