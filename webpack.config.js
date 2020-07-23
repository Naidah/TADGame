const path = require('path');
const nodeExternals = require('webpack-node-externals');


const config = {
  // set to false because __dirname resolving to / instead of absolute path when
  // built using webpack
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "[name].bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      }
    ]
  },
  node: {
    __dirname: false,
    fs: "empty",
    net: "empty"
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx']
  },
};

const serverConfig = Object.assign({}, config, {
  // set target to node to fix build warnings
  target: 'node',
  name: 'server',
  entry: { server: './src/server.ts' },
  // webpack-node-externals package used to exclude other packages like express
  // in the final bundle.js
  externals: [nodeExternals()]
});

// widget.js file served from dist/widget
const widgetConfig = Object.assign({}, config, {
  // set target to web for use in browsers
  target: 'web',
  name: 'widget',
  entry: {
    client: './src/static/client/client.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    // proxy: {
    //   '/socket.io': {
    //     target: 'http://localhost:5000',
    //     ws: true
    //   }
    // }
  }
});

module.exports = [widgetConfig, serverConfig];