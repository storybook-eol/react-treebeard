import React from 'react';
import PropTypes from 'prop-types';

import {Ul} from '../common';

const Loading = ({style, decorators}) => (
    <Ul style={style.subtree}>
        <li>
            <decorators.Loading style={style.loading}/>
        </li>
    </Ul>
);

Loading.propTypes = {
    decorators: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
};

export default Loading;
