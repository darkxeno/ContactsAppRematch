process.env.NODE_ENV = "production"
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');  

const webpackConfigProd = require("react-scripts/config/webpack.config.prod")

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

