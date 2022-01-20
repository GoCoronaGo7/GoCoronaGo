const presets = ['@babel/preset-react']
if (process.env.NODE_ENV === 'PRODUCTION') {
    presets.push(['minify', { builtIns: false }])
}
module.exports = {
    presets: presets,
    plugins: [
        [
            'transform-react-remove-prop-types',
            {
                mode: 'remove'
            }
        ]
    ]
}
