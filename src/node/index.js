/**
 * 以cjs和default两种方式导出Node.js平台相关API
 */

// 网络相关API
export * from './network'; // cjs路由
export { default } from './network'; // 默认路由