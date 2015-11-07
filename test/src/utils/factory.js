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
    }
};
