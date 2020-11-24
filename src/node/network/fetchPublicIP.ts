import * as child_process from 'child_process';
import * as http from 'http';

/** CloudFlare Worker API接口 */
const CF = 'http://ip.father.workers.dev';

/**
 * 使用CloudFlare Worker API获取公共网络IP地址
 * fetch public IP address
 */
export function fetchPublicIP(): Promise<string> {
	return new Promise((resolve, reject) => {
		const req: http.ClientRequest = http.request(CF, {
			method: 'GET',
		}, (msg: http.IncomingMessage) => {
			let chunks: Buffer[] = [];
			msg.on('data', (chunk: Buffer) => {
				chunks.push(chunk);
			});
			msg.once('end', () => {
				msg.removeAllListeners('data');
				resolve(chunks[0].toString());
			});
		});
		req.end();
	});
}

/**
 * fetch public IP address
 */
export function fetchPublicIP_by_curl(): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			let child = child_process.exec(`curl "${CF}"`, {}, (error, stdout, stderr) => {
				if (!!!error) {
					resolve(stdout);
				}
			});
		} catch (error) {
			reject();
		}
	});
}
