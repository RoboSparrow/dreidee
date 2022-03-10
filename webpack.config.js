
//todo: https://github.com/webpack-contrib/mini-css-extract-plugin
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {

    entry: './src/index.js',

    output: {
        filename: '[name].[hash].js',
        path: BUILD_PATH,
    },

    resolve: {
        extensions: ['.js'],
        modules: [path.join(process.cwd(), 'src'), 'node_modules'], // include imported modules
    },

    module: {
        rules: [{
            // eslint-loader
            enforce: 'pre', // force source files untouced by other loaders
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            // css-loader
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }, {
            // file-loader
            test: /\.(png|svg|jpg|gif)$/,
            use: [ 'file-loader' ],
        }],
    },

    devtool: "source-map",

    devServer: {
        port: 3008,
        open: true,
        hot: true,
        devMiddleware: {
            stats: {
                // minimal output on development terminal, show eslint errors and warns, surpress other stats
                assets: false,
                children: false,
                modules: false,
            },
        },
    },

    plugins: [
        // clean up build folder
        new CleanWebpackPlugin({
            root: process.cwd(),
        }),
        // parse and copy index.html
        new HtmlWebpackPlugin({
            inject: 'head', // all javascript resources will be placed in <head> (default: bottom body)
            template: path.resolve(__dirname, 'src') + '/index.html',
        }),
        // hmr
        new webpack.HotModuleReplacementPlugin(),
        // copy static
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static/**/*', to: BUILD_PATH },
            ],
        }),
    ]
};
