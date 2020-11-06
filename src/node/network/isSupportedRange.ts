import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';

/**
 * 判断url是否支持范围请求
 * @param url 
 */
export default 
function isSupportedRange(url: URL | string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (typeof url === 'string') url = new URL(url);
        const options: http.RequestOptions = {
            method: 'HEAD',
            headers: {
                'Range': 'bytes=0-',
            },
        };
        let req: http.ClientRequest; // 根据URL协议，判断使用http还是https模块发送请求
        function callback(response: http.IncomingMessage) {
            // console.log(response.statusCode);
            // console.log(response.headers);
            // 假如在响应中存在 Accept-Ranges 首部（并且它的值不为 “none”），那么表示该服务器支持范围请求。
            if (response.statusCode === 206 || (response.headers["accept-ranges"] && response.headers["accept-ranges"] !== 'none')) resolve(true);
            resolve(false);
        }
        switch (url.protocol) {
            case 'http:': {
                req = http.request(url, options, callback);
                break;
            }
            case 'https:': {
                req = https.request(url, options, callback);
                break;
            }
            default: return void resolve(false);
        }
        req.addListener('error', (err: Error) => {
            reject(err); // 请求失败
        });
        req.end(); // refresh request stream
    });
}
