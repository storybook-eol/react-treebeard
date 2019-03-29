import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Ul = styled('ul', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({style}) => style);

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
