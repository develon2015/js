require('colors');
const log = console.log;
const info = console.info;
const warn = console.warn;
const error = console.error;

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
function hook() {
    if (inited) return;
    inited = true;
    console.log = (...params) => {
        let color = 'brightGreen';
        log('[V]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.info = (...params) => {
        let color = 'brightMagenta';
        info('[I]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.warn = (...params) => {
        let color = 'yellow';
        warn('[W]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.error = (...params) => {
        let color = 'brightRed';
        error('[E]'[color], ...(params.map(it => stringify(it)[color])));
    };
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

export default {
    log, info, error, warn,
    hook,
};