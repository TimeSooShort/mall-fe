/*
* @Author: Miao
* @Date:   2018-07-29 01:03:01
* @Last Modified by:   Miao
* @Last Modified time: 2018-07-31 16:48:15
*/
var webpack = require('webpack');
var Ex      = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev_win';
console.log(WEBPACK_ENV);

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name +'.html',
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    }
};
// webpack config
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'indexs' : ['./src/page/indexs/index.js'],
        'login'  : ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: Ex.extract('style-loader', 'css-loader')},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=images/[name].[ext]'},
        ]
    },
    resolve : {
        alias : {
            node_modules : __dirname + '/node_modules',
            util    : __dirname + '/src/util',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image'
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new Ex("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('indexs')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

if ('dev_win' == WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;