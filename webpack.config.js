const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
    // TODO: Add common Configuration
    module: {},
};

var fooConfig = Object.assign({}, config, {
    name: 'a',
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            }
        ],
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        allowedHosts: [
            'host.com',
            '*',
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
    ]
});

// Array of Configurations
module.exports = [
    fooConfig,
];
