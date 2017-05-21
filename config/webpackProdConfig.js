const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  publicPath,
  paths,
  output: {
    mediaFiles,
    cssFiles,
    chunkJsFiles,
    vendorBundleName
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
  publicPath: `.${publicPath}`,
  // Generated JS file names (with nested folders).
  // There will be one main bundle, and one file per asynchronous chunk.
  filename: chunkJsFiles,
  // Add /* filename */ comments to generated require()s in the output.
  chunkFilename: chunkJsFiles
};

const resolve = {
  extensions: ['.js', '.json', '.jsx']
};

// The "file" loader handles all assets unless explicitly excluded.
// "file" loader makes sure those assets end up in the "build" folder.
// When you "import" an asset, you get its filename.
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

// "css" loader resolves paths in CSS and adds assets as dependencies.
const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    minimize: true,
    sourceMap: true
  },
};

// "postcss" loader applies autoprefixer to our CSS.
const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ],
        flexbox: 'no-2009'
      })
    ]
  }
};

// "style" loader normally turns CSS into JS modules injecting <style>.
// "ExtractTextPlugin" first applies the "postcss" and "css" loaders,
// then grabs the result CSS and puts it into a separate file in our
// build process. This way we actually ship a single CSS file in production
// instead of JS code injecting <style> tags.
const extractTextPluginLoader = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      cssLoader,
      postCssLoader
    ],
    // ExtractTextPlugin expects the build output to be flat.
    // However, our output is structured with css, js and media folders.
    // To have this structure working with relative paths
    // Making sure that the publicPath goes back to to build folder.
    publicPath: Array(cssFiles.split('/').length).join('../')

  })
};

// Generates an "index.html" file with the <script> injected.
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  inject: true,
  template: entryHtml,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});

// Makes some environment variables available to the JS code
const definePlugin = new webpack.DefinePlugin({
  // Tells React to build in either prod modes.
  'process.env.NODE_ENV': JSON.stringify('production')
});

// Minify the code.
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    reduce_vars: false,
    screw_ie8: true
  },
  mangle: {
    screw_ie8: true,
  },
  output: {
    comments: false,
    screw_ie8: true
  },
  sourceMap: true
});

const extractTextPlugin = new ExtractTextPlugin({
  filename: cssFiles,
  allChunks: true
});

// Use CommonsChinkPlugin to create a separate bundle of vendor libraries
// so that they are cached separately.
const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  allChunks: true,
  name: vendorBundleName
});

module.exports = {
  target: 'web',
  // Don't attempt to continue if there are any errors.
  bail: true,
  devtool: 'source-map',
  entry: [entryJs],
  output,
  resolve,
  module: {
    strictExportPresence: true,
    rules: [
      fileLoader,
      urlLoader,
      babelLoader,
      extractTextPluginLoader
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    definePlugin,
    uglifyJsPlugin,
    extractTextPlugin,
    commonsChunkPlugin
  ]
};
