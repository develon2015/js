/**
 * 将UTF-8字符串解码为UTF-16编码，存放到ArrayBuffer中
 * 
 * 用于`btoa()`函数按字节编码二进制字符串
 * @param str 
 */
export function UTF8ToUTF16(str: string): Uint16Array {
    var uint16 = new Uint16Array(str.length); // 并非所有的字符都是2个字节可以搞定，有的字符需要4个字节，此处32位字符的长度是2，正确
    // Array.prototype.forEach.call(null, function (el, idx, arr) { arr[idx] = str.charCodeAt(idx); }); // MDN的高级写法
    let length = uint16.length; // 'A\u4F60\u{2F804}'.length // 1+1+2=4
    for (let i = 0; i < length; i++) {
        uint16[i] = str.charCodeAt(i); // 4字节字符需要前后取两次
    }
    return uint16;
}