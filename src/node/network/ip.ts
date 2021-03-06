import * as os from 'os';

/**
 * 获取本地网卡的IPv4和IPv6地址，本地回环地址127和::1除外
 */
export function ip(): { ipv4: string[], ipv6: string[] } {
    let nis = os.networkInterfaces();
    let ips = { ipv4: [], ipv6: [], };
    for (let name in nis) {
        let ni = nis[name];
        ni.forEach(it => {
            if (it.address.match(/^(::1|127\.0\..*)$/)) {
                // console.log(`本地环回地址：${it.address}`);
                return;
            }
            switch (it.family) {
                case 'IPv4': {
                    ips.ipv4.push(it.address);
                    break;
                }
                case 'IPv6': {
                    ips.ipv6.push(it.address);
                    break;
                }
            }
        })
    }
    return ips;
}