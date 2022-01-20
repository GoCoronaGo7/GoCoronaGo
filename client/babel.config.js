module.exports = {
    presets: ['@babel/preset-react', ['minify', { builtIns: false }]],
    plugins: [
        [
            'transform-react-remove-prop-types',
            {
                mode: 'remove'
            }
        ]
    ]
}
