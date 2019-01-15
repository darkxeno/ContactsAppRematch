process.env.NODE_ENV = "production"
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');  

const webpackConfig = require("react-scripts/config/webpack.config")
const webpackConfigProd = webpackConfig('production');

console.log('Using webpack config:',webpackConfigProd);

webpackConfigProd.plugins.push(
  new NormalModuleReplacementPlugin(
    /.*\/generated\/iconSvgPaths.*/,
    path.resolve(__dirname, './iconSvgPaths.js'),
  )
)

webpackConfigProd.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "report.html",
  })
)


require("react-scripts/scripts/build")

