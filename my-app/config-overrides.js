const {
    override,
    fixBabelImports
} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    (config) => {
        
        if (config.mode === 'production') {
            // console.log(config)
            config.output.publicPath = './'

            for (let i = 0; i < config.plugins.length; i++) {
                let item = config.plugins[i];
    
                // 更改输出的样式文件名
                if (item.constructor.toString().indexOf('class MiniCssExtractPlugin') > -1) {
                    item.options.filename = 'static/css/[name].css?_v=[contenthash:8]';
                    item.options.chunkFilename = 'static/css/[name].chunk.css?_v=[contenthash:8]';
                }
            }

            // 更改生产模式输出的文件名
            config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]';
            config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]';

            // 修改 build/static/media/ 路径下的文件名
            for (let i = 0; i < config.module.rules[2].oneOf.length; i++) {
                const item = config.module.rules[2].oneOf[i];
                if (!item.options || !item.options.name) {
                    continue;
                }
                let str = item.options.name.toString();
                if (str.indexOf('./[name].[hash:8].[ext]') > -1) {
                    item.options.name = './[name].[ext]?_v=[hash:8]';
                }
            }
        }
        return config
    }
);
