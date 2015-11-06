'use strict';

export default {
    toggle: (state) => {
        return {
            animation: { rotateZ: state.toggled ? 90 : 0 },
            duration: 300
        };
    },
    drawer: (/* state */) => {
        return {
            enter: {
                animation: 'slideDown',
                duration: 300
            },
            leave: {
                animation: 'slideUp',
                duration: 300
            }
        };
    }
};
