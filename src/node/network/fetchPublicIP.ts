import * as child_process from 'child_process';

/**
 * 使用CloudFlare Worker API获取公共网络IP地址
 * fetch public IP address
 */
export function fetchPublicIP() {
	return new Promise((resolve, reject) => {
		try {
			let child = child_process.exec(`curl "http://ip.father.workers.dev"`, {}, (error, stdout, stderr) => {
				if (!!!error) {
					resolve(stdout);
				}
			});
		} catch(error) {
			reject();
		}
	});
}