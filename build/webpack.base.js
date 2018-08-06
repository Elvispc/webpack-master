const end = 'production' === process.env.NODE_ENV
const { entries, HTMLPlugins } = require('./entries')

module.exports = {
    entry: entries,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            
        },
        extensions: ['.css', '.js', '.styl']
    },
    plugins: HTMLPlugins
}