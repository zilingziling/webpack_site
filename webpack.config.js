const path=require('path');
// 每次打包之前会清除本地之前build的文件
const CleanWebpackPlugin=require('clean-webpack-plugin')
//打包css文件
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
// 根据HTML模板生成HTML文件
const HtmlWebpackPlugin=require('html-webpack-plugin')
// 配置
module.exports={
    mode:'development',
//    入口文件
    entry:{
        index:'./src/javascript/index.js',
        coreProducts:'./src/javascript/coreProducts.js',
        companyIntro:'./src/javascript/companyIntro.js',
        companyNews:'./src/javascript/companyNews.js',
        information:'./src/javascript/information.js',
        contactUs:'./src/javascript/contactUs.js'
    },
    output: {
        filename: "javascript/[name].[hash].js",
        path: path.resolve(__dirname,'dist')// 默认dist文件夹
    },
    resolve: {
    //    配置路径别名
        alias:{
            "@":path.resolve(__dirname,'src'),
            'css':path.resolve(__dirname,'src/css'),
            'images':path.resolve(__dirname,'src/images')
        }
    },
    module:{
        rules: [
            // 用html-loader处理HTML文件
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options:{
                            minimize:true
                        }
                    }
                ]
            },
        //    将pug模板页面转成HTML
            {
                test:/\.pug$/,
                use:[
                    {
                        loader: "html-loader",
                        options:{
                            minimize:true
                        },
                    },
                    'pug-html-loader',
                ]
            },
        //    css文件规则
            {
                test:/\.css$/,
                use:[
                    {
                        // 使用MiniCssExtraPlugin.loader可以将css文件打包为文件，不嵌入HTML文档的head里的style标签,用link标签
                        loader: MiniCssExtractPlugin.loader,
                        // css文件中的静态路径前加上../，因为打包后结构变化了，如果不加该项引入不了资源
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 处理stylus的样式文件
            {
                test:/\.styl(us)?$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                //    stylus-loader 处理styl的文件
                    'stylus-loader'
                ]
            },
            // 处理sass的文件
            {
               test:/\.sass$/,
               use:[
                   "style-loader", // creates style nodes from JS strings
                   "css-loader", // translates CSS into CommonJS
                   "sass-loader" // compiles Sass to CSS, using Node Sass by default
               ]
            },
            // 图片资源用file-loader
            {
            test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader: "file-loader",
                        options:{
                            name:'images/[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
//    使用插件
    plugins: [
        // 引入CleanWebpackPlugin,每次build都删除之前打包的文件
        new CleanWebpackPlugin(['dist']),
    //    autoprefixer用于自动给css属性加上前缀
        require('autoprefixer'),
    //    打包css的文件
        new MiniCssExtractPlugin({
            // 打包到css文件夹
            filename: './css/[name].css'
        }),
    //    打包HTML插件 ，每个HTML文件都需要配置
    //     new HtmlWebpackPlugin({
    //     //    html文件的模板
    //         template: "./src/yinYang.pug",
    //     //    打包出来的文件名
    //         filename: "./yinYang.html",
    //     //    该HTML文件需要引入的js文件，对应的是上方入口的键名
    //         chunks: ['yinYang']
    //     }),
        new HtmlWebpackPlugin({
        //    html文件模板
            template: "./src/index.pug",
            filename: "./index.html",
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: "./src/coreProducts.pug",
            filename: "coreProducts.html",
            chunks: ['coreProducts']
        }),
        new HtmlWebpackPlugin({
            template: "./src/companyIntro.pug",
            filename: "companyIntro.html",
            chunks: ['companyIntro']
        }),
        new HtmlWebpackPlugin({
            template: "./src/companyNews.pug",
            filename: "companyNews.html",
            chunks: ['companyNews']
        }),
        new HtmlWebpackPlugin({
            template: "./src/information.pug",
            filename: "information.html",
            chunks: ['information']
        }),
        new HtmlWebpackPlugin({
            template: "./src/contactUs.pug",
            filename: "contactUs.html",
            chunks: ['contactUs']
        }),
    ],
    // devServer配置
    devServer: {
        //默认打开浏览器
        open:true,
        //压缩文件
        compress:true,
        //端口号
        port:3000
    }
}
