import styled from '@emotion/styled';

const Div = styled('div', {
    shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})((({style}) => style));

export {Div};
