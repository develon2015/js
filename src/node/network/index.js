import ip from './ip';
import fetchPublicIP from './public_ip';

export { ip, fetchPublicIP, }; // cjs导出
export default { ip, fetchPublicIP, }; // 默认导出