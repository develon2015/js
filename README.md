## Description

None.

## Install

```
$ yarn add @develon/js
```
or
```
$ npm install @develon/js
```

## 反思

我们知道webpack支持以默认导入的方式兼容CommonJS模块, 但是TypeScript不支持.
所以最好的方式是放弃使用默认导出, 只使用CommonJS导出.
导入时使用import * as alias的方式即可.
