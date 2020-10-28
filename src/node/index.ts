/**
 * 以cjs和default两种方式导出Node.js平台相关API
 */

// 网络相关API
// 分别使用cjs路由、默认路由两种方式导出
export * from './network';
export { default } from './network';

// commonjs语法导出，IDE无法提示。
// 在tsconfig.js中启用"compilerOptions": { "declaration": true }时甚至会警告。
// module.exports = {
    // ...require('./network'), // 网络相关API
// };