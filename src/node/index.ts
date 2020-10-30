/**
 * 以cjs和default两种方式导出Node.js平台相关API
 */

// 网络相关API
// 分别使用cjs路由、默认路由两种方式导出
import network from './network';
export * from './network';
// export { default } from './network'; // 不可以多次使用该语法

// commonjs语法导出，IDE无法提示。
// 在tsconfig.js中启用"compilerOptions": { "declaration": true }时甚至会警告。
/**
module.exports = {
    ...require('./network'), // 网络相关API
    ...require('./console'), // 控制台相关API
}; // 不可以合并default字段
*/
import _console from './console';
export * from './console';

// 默认导出
export default { ...network, ..._console, };