/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const nodeExternals = require('webpack-node-externals');


const config = {
    // set to false because __dirname resolving to / instead of absolute path when
    // built using webpack
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "[name].bundle.js",
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
            },
            {
                test: /\.ts?$|\.tsx$/,
                use: "awesome-typescript-loader",
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
            },
            {
                test: /\.ts?$|\.tsx$|\.js$/,
                loader: "eslint-loader",
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
            },
        ],
    },
    node: {
        __dirname: false,
        fs: "empty",
        net: "empty",
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
    },
};

const serverConfig = Object.assign({}, config, {
    // set target to node to fix build warnings
    target: 'node',
    name: 'server',
    entry: { server: './src/server.ts' },
    // webpack-node-externals package used to exclude other packages like express
    // in the final bundle.js
    externals: [nodeExternals()],
});

// widget.js file served from dist/widget
const widgetConfig = Object.assign({}, config, {
    // set target to web for use in browsers
    target: 'web',
    name: 'widget',
    entry: {
        client: './src/static/client/client.ts',
        editor: './src/editor/editor.tsx',
        menu: './src/lobby/menu.tsx',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
});

module.exports = [widgetConfig, serverConfig];
