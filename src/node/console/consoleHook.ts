require('colors');
/** 原生控制台对象 */
let _console = globalThis.console;
let console = { ..._console };

function stringify(obj) {
    if (obj === null) return '[null]';
    if (obj === undefined) return '[undefined]';
    switch (obj && obj.constructor) {
        case String: {
            return obj;
        }
        case Function: {
            return `[Function: ${obj.name || 'anonymous'}]`;
        }
        case Error: {
            return obj.stack;
        }
        case RegExp: {
            return `[RegExp: ${obj.toString()}]`;
        }
    }
    try { // 如果是其它对象，尝试输出JSON，其次toString()
        return JSON.stringify(obj, (key, value) => {
            if (value && value.constructor === Function) {
                return `[Function: ${value.name || 'anonymous'}]`;
            }
            if (value && value.constructor === RegExp) {
                return `[RegExp: ${value.toString()}]`;
            }
            return value;
        }, 2);
    } catch (error) {
        return obj.toString();
    }
}

let inited = false;
/**
 * 重载console.log()等方法, 从而支持颜色等特性.
 */
export function hook() {
    if (inited) return;
    inited = true;
    console.log = (...params) => {
        let color = 'brightGreen';
        _console.log('[V]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.info = (...params) => {
        let color = 'brightMagenta';
        _console.info('[I]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.warn = (...params) => {
        let color = 'yellow';
        _console.warn('[W]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.error = (...params) => {
        let color = 'brightRed';
        _console.error('[E]'[color], ...(params.map(it => stringify(it)[color])));
    };
    globalThis.console = console;
}

void function test() {
    hook();
    let test = ['ABC', [1, 2, 3], new Error('测试颜色'), () => { }, function Foo() { }, /.*/ig];
    console.log(...test);
    console.info(...test);
    console.warn(...test);
    console.error(...test);
}
// ();

export { _console as native };