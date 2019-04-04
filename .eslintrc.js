module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        "max-len": [
            "error",
            120
        ],
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error'
    }
};
