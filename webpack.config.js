module.exports = options => {
  return {
    entry: './frontend/main.jsx',
    output: {
      filename: './backend/public/bundle.js',
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
  }
}
