'use strict';

export default {
    name: 'react-treebeard',
    toggled: true,
    children: [
        {
            name: 'example',
            children: [
                {
                    name: 'app.js',
                    terminal: true
                },
                {
                    name: 'data.js',
                    terminal: true
                },
                {
                    name: 'index.html',
                    terminal: true
                },
                {
                    name: 'styles.js',
                    terminal: true
                },
                {
                    name: 'webpack.config.js',
                    terminal: true
                }
            ]
        },
        {
            name: 'node_modules',
            loading: true
        },
        {
            name: 'src',
            children: [
                {
                    name: 'components',
                    children: [
                        {
                            name: 'decorators.js',
                            terminal: true
                        },
                        {
                            name: 'treebeard.js',
                            terminal: true
                        }
                    ]
                },
                {
                    name: 'index.js',
                    terminal: true
                }
            ]
        },
        {
            name: 'themes',
            children: [
                {
                    name: 'animations.js',
                    terminal: true
                },
                {
                    name: 'default.js',
                    terminal: true
                }
            ]
        },
        {
            name: 'Gulpfile.js',
            terminal: true
        },
        {
            name: 'index.js',
            terminal: true
        },
        {
            name: 'package.json',
            terminal: true
        }
    ]
};
