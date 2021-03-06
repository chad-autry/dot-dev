var webpack = require('webpack');

const common = {
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

//Note: Exclude my own external modules from the node_modules exclusion which I know need compilation
var prodLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - without the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules\/(?!(client-auth-jwt|character-perspective-client)\/).*/,
    loaders: ['babel-loader']
  },
]

module.exports = {
  entry: [
  // our entry file
  './src/bootStrap.js'
  ],
  output: {
    path: __dirname + '/target/webapp',
    filename: 'bundle.js',
    publicPath: "/"
  },
  devtool:'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(client-auth-jwt|character-perspective-client|react-awesome-svg)\/).*/,
	                    use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env','@babel/preset-react']
        }
      }
      }
    ]
  },
  plugins: [
  ],
};
