'use strict';

export default {
    toggle: ({node: {toggled}}) => ({
        animation: {rotateZ: toggled ? 90 : 0},
        duration: 300
    }),
    drawer: (/* props */) => ({
        enter: {
            animation: 'slideDown',
            duration: 300
        },
        leave: {
            animation: 'slideUp',
            duration: 300
        }
    })
};
