const path = require('path');
const projectName = '.';

function getWebpackConfigByName(projectName) {
    const DIR_PROJECT = path.resolve(__dirname, projectName);
    const DIR_SRC = path.resolve(DIR_PROJECT, 'src');
    const DIR_DIST = path.resolve(DIR_PROJECT, 'lib');

    const config = {
        target: 'node', // webpack默认构建目标是web，我们需要构建的是后端应用
        mode: 'none', // 开发模式编译速度最快，但文件体积较大
        entry: {
            common: path.resolve(DIR_SRC, 'common/index'),
            node: path.resolve(DIR_SRC, 'node/index'),
            web: path.resolve(DIR_SRC, 'web/index'),
            '/': path.resolve(DIR_SRC, 'test'), // root test
        },
        output: {
            filename: '[name]/index.js',
            path: DIR_DIST,
            libraryTarget: 'umd', // 包括var（默认值，用于web场景）、commonjs[2]、amd等选项
        },
        module: {
            rules: [
                {
                //    test: /\.(js|ts)$/, use: 'babel-loader', // 从babel配置文件读取options
                },
            ],
        },
        resolve: {
            extensions: ['.wasm', '.mjs', '.js', '.json', '.ts'], // 添加.ts解析
        },
        // devtool: 'eval',
    };
    return { config, DIR_DIST, };
}

/**
 * 导出一个提供config的函数，从而访问命令行参数，但是要区分Webpack-CLI参数和直接调用该导出的区别
 * Webpack-CLI会解析"--env production"为env: { production: true}，而不是argv: { entry: ["--env", "production"] }
 * Webpack-CLI会替换我们导出的config.entry为命令行中提供的entry，从而成为一个编译命令："webpack ./entry_a.js"
 * @param {*} env 由CLI解析的选项参数
 * @param {*} argv 
 */
module.exports = (env = {}, argv = { entry: [] }) => {
    // console.log({ env, argv });
    const { config, DIR_DIST, } = getWebpackConfigByName(projectName);
    if (env.rebuild) { // 重建dist产物
        const child_process = require('child_process');
        let removeDistCmd = `rm -rf ${DIR_DIST}`;
        console.log(`执行清理：${removeDistCmd}`.red);
        try { child_process.execSync(removeDistCmd); } catch (error) { console.error('清理失败'.red); }
    }
    if (env.watch) { // watch模式持续编译，如果调用webpack(config, callback)时提供了回调，则可监听编译完成事件
        config.watch = true;
    }
    return config;
};