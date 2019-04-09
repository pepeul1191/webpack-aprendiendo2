const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

var config = {
    // TODO: Add common Configuration
    module: {},
};

var config = Object.assign({}, config,
{
    name: 'hola',
    mode: 'development',
    entry: {
        index: './src/index.js',
        app: './src/routes/app.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/dist')
    },
    watch: true, // autoreload ante cambios
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
        host: '0.0.0.0',
        port: 8080,
        contentBase: [
            path.join(__dirname, './public'),
            path.join(__dirname, './src'),
        ],
        publicPath: '/src/',
        compress: true,
        watchContentBase: true,
        hot: true,
        inline:true,
        allowedHosts: [
            'host.com',
            '*',
        ],
        headers: {
            'Server': 'Ubuntu'
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        //new webpack.HotModuleReplacementPlugin(),
    ]
});

// Array of Configurations
module.exports = [
    config,
];
