import { ip, fetchPublicIP, } from './node';

console.log('IP地址检测：');
console.log(ip().ipv4[0]);

import node, { _console } from './node';
node._console.hook();
_console.hook();
console.log(`require('./node') =>`, require('./node'));