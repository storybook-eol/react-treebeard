'use strict';

export default {
    toggle: (state) => {
        return {
            animation: { rotateZ: state.toggled ? 90 : 0 },
            duration: 300
        };
    },
    children: (/* state */) => {
        return {
            enter: 'slideDown',
            leave: 'slideUp'
        };
    }
};
