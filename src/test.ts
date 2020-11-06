import { ip, fetchPublicIP, } from './node';

console.log('IP地址检测：');
console.log(ip().ipv4[0]);
void async function () {
    let ip = await fetchPublicIP();
    console.log(`公网IP: ${ip}`);
}();

import node, { _console } from './node';
node._console.hook();
_console.hook();
console.log(`require('./node') =>`, require('./node'));

import { isSupportedRange } from './node';
let url = 'https://avatars1.githubusercontent.com/u/27133157?s=64&v=4';
isSupportedRange(url).then(bool => {
    console.log(`${url} ${bool ? '' : '不'}支持断点续传!`);
})
