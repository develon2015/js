require('colors');
const _log = console.log;
const _info = console.info;
const _warn = console.warn;
const _error = console.error;

function stringify(obj) {
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

function hook() {
    console.log = (...params) => {
        let color = 'brightGreen';
        _log('[V]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.info = (...params) => {
        let color = 'brightMagenta';
        _info('[I]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.warn = (...params) => {
        let color = 'yellow';
        _warn('[W]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.error = (...params) => {
        let color = 'brightRed';
        _error('[E]'[color], ...(params.map(it => stringify(it)[color])));
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
    _log, _info, _error, _warn,
    hook,
};