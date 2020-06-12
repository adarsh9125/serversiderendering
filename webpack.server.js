const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const serverConfig = {
  mode: "development",
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'iso-morphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer()]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  }
};

const clientConfig = {
    mode: "development",
    target: "web",
    entry: {
      "index.js": path.resolve(__dirname, "src/index.js"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                  { loader: 'iso-morphic-style-loader' },
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      modules: {
                        localIdentName: '[name]__[local]__[hash:base64:5]'
                      }
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      ident: 'postcss',
                      plugins: () => [autoprefixer()]
                    }
                  }
                ]
              },
              {
                test: /\.(png|jpg|jpe?g|gif)$/,
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
              },
            
        ]
      },
      plugins:[
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            //inject: 'body'
            inject: true,
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
      output: {
        path: path.resolve('server-build'),
        filename: 'index1.js'
      },
  }

  module.exports = [serverConfig];