var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');

var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var precss = require('precss');
//var rucksack = require('rucksack-css');

var APP_DIR = path.resolve(__dirname, 'app');
var BUILD_DIR = path.resolve(__dirname, 'build');

var config = {

};
/*
 * PRODUCTION ENVIRONMENT
 */
var prodEnv = {
    entry: [
        APP_DIR + '/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            },
            // PostCSS Loader
            {
                test: /\.css$/,
                include: APP_DIR,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader'])
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin("file.css", {
            allChunks: true
        })
    ],
    postcss: [
        precss,
        autoprefixer
    ]
};
/*
 * DEV ENVIRONMENT
 */
var devEnv = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/index.jsx'
    ],
    output: {
        path: path.join(__dirname),
        filename: 'build/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    postcss: [
        precss,
        autoprefixer
    ]
};

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(config, prodEnv);
        break;
    case 'dev':
        config = merge(config, devEnv);
        break;
    default:
        console.log('NOPE');
}


module.exports = config;