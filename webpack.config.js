const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const SRC_DIR = path.join(__dirname, '/client');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
    context: SRC_DIR,
    entry: './index.js',
    output: {
        filename: 'pricewarsbundle.js',
        path: DIST_DIR,
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new CompressionPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'env'],
                },
                resolve: {
                    extensions: ['.js', '.jsx'],
                }
            },
            {
                test: /\.css/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }
                ]
            }
        ]
    }
}