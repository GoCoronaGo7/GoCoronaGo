module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'standard'
    ],
    globals: {
        React: 'readonly',
        ReactDOM: 'readonly',
        regions: 'writable',
        PropTypes: 'readonly',
        ReactRouterDOM: 'readonly',
        STATS_DATA: 'readonly',
        BASE_URL: 'readonly',
        FLASK_SESSION: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/react-in-jsx-scope': 0,
        indent: ['error', 4]
    }
}
