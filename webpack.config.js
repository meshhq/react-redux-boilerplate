const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.tsx"
    ],

    // Tell webpack where to put its output.
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging Webpack's output.
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        inline: true,
        historyApiFallback: true,
        hot: true,
        port: 3000
    },

    // Compile all files with these extensions.
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [" ", ".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new CheckerPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            files: {
              css: ['style.css'],
              js: [ "bundle.js"],
            }
          }),
    ],

    // Module Loaders
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: [
                    "react-hot-loader/webpack",
                    "awesome-typescript-loader" 
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" },

            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ],
        loaders: [
            // Compile SCSS files
            {
                test: /\.scss$/,
                loaders: ["style-loader", "sass-loader", "css-loader"],
                exclude: ["node_modules"]
            },
            {
                test: /\.tsx$/,
                loader: 'awesome-typescript-loader',
                exclude: ["node_modules"],
                query: {
                  tsconfig: './tsconfig.json',
                  useTranspileModule: true,
                }
            }
        ]
    }
}