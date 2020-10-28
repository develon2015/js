import { ip, fetchPublicIP, } from './node';
import node from './node';

console.log('IP地址检测：');
console.log(ip().ipv4[0]);
console.log(node.ip().ipv6[0]);