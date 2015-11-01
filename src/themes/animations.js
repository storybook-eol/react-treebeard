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
    children: (/* state */) => {
        return {
            enter: {
                animation: 'transition.slideLeftIn',
                stagger: 200
            }
        };
    }
};
