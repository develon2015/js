export * from '../common'; // 导出公共API, encode会被重载, 需要单独在./encode/index中导出
export * as encode from './encode';
// export * from '../common'; // encode还是会被重载, 与导入顺序无关, as优先原则