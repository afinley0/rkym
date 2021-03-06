const path = require('path');

module.exports = {
    mode: 'development',
    entry: './main.jsx',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};
