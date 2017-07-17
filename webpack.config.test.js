'use strict';

module.exports = {
    cache: true,
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [
                'istanbul-instrumenter-loader',
                'babel-loader'
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
