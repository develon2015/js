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