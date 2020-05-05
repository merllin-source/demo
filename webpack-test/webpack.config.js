module.exports = {
    entry: './src/main.js',    // 需要被打包的js文件路径及文件名
    output: {
        path: __dirname + '/dist',    // 打包输出的目标文件的绝对路径（其中__dirname为当前目录的绝对路径）
        filename: 'index.js'   // 打包输出的js文件名及相对于dist目录所在路径
    },

    module: {
        rules: [
            {
                test: /\.css$/,   // 正则表达式，表示.css后缀的文件
                use: ['style-loader', 'css-loader']   // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            }
        ]
    }





};