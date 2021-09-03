module.exports = {
    presets: ['@babel/preset-react', 'minify'],
    plugins: [
        ['transform-react-remove-prop-types',
            {
                mode: 'remove'

            }
        ]
    ]
}
