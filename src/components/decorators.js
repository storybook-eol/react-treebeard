'use strict';

import React from 'react';

const Loading = (
    <div>loading...</div>
);

const Toggle = (
    <div>
        <i>V</i>
    </div>
);

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
