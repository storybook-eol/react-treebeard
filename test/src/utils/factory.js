'use strict';

const React = require('react');

module.exports = {
    createDecorators: function(spec){
        spec = spec || {};
        return {
            Loading: (props) => {
                return spec.loading ? <spec.loading {...props}/> : <div/>;
            },
            Toggle: (props) => {
                return spec.toggle ? <spec.toggle {...props}/> : <div/>;
            },
            Header: (props) => {
                return spec.header ? <spec.header {...props}/> : <div/>;
            }
        };
    },
    createAnimations: function(){
        return {
            toggle: () => {
                return {
                    animation: 'animation-1',
                    duration: 1
                };
            },
            drawer: () => {
                return {
                    enter: {
                        animation: 'animation-2',
                        duration: 2
                    },
                    leave:{
                        animation: 'animation-3',
                        duration: 3
                    }
                };
            }
        };
    }
};
