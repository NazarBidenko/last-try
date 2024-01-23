module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/last-try/'
    : '/',
  transpileDependencies: true,
}