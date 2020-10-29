import { ip, fetchPublicIP, } from './node';
import { _console, } from './node';

_console.hook();
console.log('IP地址检测：');
console.log(ip().ipv4[0]);