// 配置跨域
module.exports = {

    devServer: {
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'https://elm.cangdu.org/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => {
        }
    }

}
