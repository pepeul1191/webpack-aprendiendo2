const path = require('path');

var config = {
    // TODO: Add common Configuration
    module: {},
};

var fooConfig = Object.assign({}, config, {
    name: "a",
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
});

// Array of Configurations
module.exports = [
    fooConfig,        
];