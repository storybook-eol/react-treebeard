'use strict';

// More Advanced Pre-Canned UI Animations
require('velocity-animate');
require('velocity-animate/velocity.ui');

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
                animation: 'slideDown'
            },
            leave: {
                animation: 'slideUp'
            }
        };
    },
    children: (/* state */) => {
        return {
            enter: {
                animation: 'transition.slideLeftIn',
                stagger: 200
            },
            leave: {
                animation: 'transition.slideLeftOut',
                stagger: 200
            },
            runOnMount: true
        };
    }
};
