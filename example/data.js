'use strict';

export default {
    id: 0,
    name: 'react-treebeard',
    toggled: true,
    children: [
        {
            id: 1,
            name: 'example',
            children: [
                {
                    id: 2,
                    name: 'app.js',
                    terminal: true
                },
                {
                    id: 3,
                    name: 'data.js',
                    terminal: true
                },
                {
                    id: 4,
                    name: 'index.html',
                    terminal: true
                },
                {
                    id: 5,
                    name: 'styles.js',
                    terminal: true
                },
                {
                    id: 6,
                    name: 'webpack.config.js',
                    terminal: true
                }
            ]
        },
        {
            id: 7,
            name: 'node_modules',
            loading: true
        },
        {
            id: 8,
            name: 'src',
            children: [
                {
                    id: 9,
                    name: 'components',
                    children: [
                        {
                            id: 11,
                            name: 'decorators.js',
                            terminal: true
                        },
                        {
                            id: 12,
                            name: 'treebeard.js',
                            terminal: true
                        }
                    ]
                },
                {
                    id: 10,
                    name: 'index.js',
                    terminal: true
                }
            ]
        },
        {
            id: 13,
            name: 'themes',
            children: [
                {
                    id: 14,
                    name: 'animations.js',
                    terminal: true
                },
                {
                    id: 15,
                    name: 'default.js',
                    terminal: true
                }
            ]
        },
        {
            id: 16,
            name: 'Gulpfile.js',
            terminal: true
        },
        {
            id: 17,
            name: 'index.js',
            terminal: true
        },
        {
            id: 18,
            name: 'package.json',
            terminal: true
        }
    ]
};
