const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  publicPath,
  paths,
  output: {
    jsFiles,
    mediaFiles
  },
  entry: {
    entryJs,
    entryHtml
  }
} = require('./projectConfig');

const output = {
  // Build folder.
  path: paths.dist(),
  // This is the URL that app is served from.
  publicPath: publicPath,
  // This does not produce a real file. It's just the virtual path that is
  // served by the development server in development.
  //
  // This is the JS bundle containing code from all our entry points,
  // and the Webpack runtime.
  filename: jsFiles,
  // Add /* filename */ comments to generated require()s in the output.
  pathinfo: true
};

const resolve = {
  extensions: ['.js', '.json', '.jsx']
};

const performance = {
  // Turn off performance hints in development. (We don't split or minify the code in dev.)
  hints: false,
};

// rules

// "file" loader makes sure that the assets get served by DevServer.
// When you import an asset, you get its (virtual) filename.
const fileLoader = {
  exclude: [
    /\.html$/,
    /\.(js|jsx)$/,
    /\.css$/,
    /\.scss$/,
    /\.sass$/,
    /\.json$/,
    /\.jpe?g$/,
    /\.png$/
  ],
  loader: 'file-loader',
  options: {
    name: mediaFiles
  }
};

// "url" loader works just like "file" loader but it also embeds
// assets smaller than specified size as data URLs to avoid requests.
const urlLoader = {
  test: [
    /\.jpe?g$/,
    /\.png$/
  ],
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: mediaFiles
  }
};

// Process JavaScript with Babel.
const babelLoader = {
  test: /\.(js|jsx)$/,
  include: paths.source(),
  loader: 'babel-loader',
  options: {
    // Enable caching results in "./node_modules/.cache/babel-loader/" directory for faster rebuilds.
    cacheDirectory: true
  }
};

// Adds CSS to the DOM by injecting a <style> tag
const styleLoader = {
  loader: 'style-loader'
};

// "css" loader resolves paths in CSS and adds assets as dependencies.
// The "css" loader interprets @import and url() like requires.
const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true
  }
};

// "postcss" loader applies autoprefixer to our CSS.
const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ]
      })
    ]
  }
};

// Plugins

// Makes some environment variables available to the JS code
const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

// Create HTML file that includes references to bundled CSS and JS.
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: entryHtml,
  minify: false,
  inject: true
});

// Emit hot updates
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
  target: 'web',
  devtool: 'eval-source-map',
  output,
  entry: [
    `webpack-hot-middleware/client?reload=true&&overlay=true&&path=${output.publicPath}__webpack_hmr`,
    entryJs
  ],
  resolve,
  performance,
  module: {
    rules: [
      fileLoader,
      urlLoader,
      babelLoader,
      {
        test: /(\.css|\.scss|\.sass)$/,
        include: paths.source(),
        use: [
          styleLoader,
          cssLoader,
          postCssLoader
        ]
      }
    ]
  },
  plugins: [
    definePlugin,
    htmlWebpackPlugin,
    hotModuleReplacementPlugin
  ]
};
