'use strict';

var webpack = require('webpack');
var webpackCfg = require('./webpack.config.test.js');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'test/loader.js'
        ],
        exclude: [],
        preprocessors: {
            // only specify one entry point
            // and require all tests in there
            'test/loader.js': ['webpack', 'sourcemap']
        },
        webpack: webpackCfg,
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require('karma-webpack'),
            require('istanbul-instrumenter-loader'),
            require('karma-mocha'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-spec-reporter'),
            require('karma-coverage-istanbul-reporter')
        ],
        reporters: ['coverage-istanbul', 'spec'],
        coverageIstanbulReporter: {
          dir: 'coverage/',
          fixWebpackSourcePaths: true,
          reports: ['lcov', 'html'],
          skipFilesWithNoCoverage: true,
          'report-config': {
            html: {
              subdir: 'report-html',
            },
            lcov: {
              subdir: 'report-lcov'
            }
          }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    })
}
