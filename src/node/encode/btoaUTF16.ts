import { UTF8ToUTF16 } from "./";

/**
 * 将UTF-8字符串编码为UTF-16编码的Base64字符串
 * @param utf8 
 */
export function btoaUTF16(utf8: string): string {
    // let uint16: Uint16Array = UTF8ToUTF16(utf8);
    // let uint8: Uint8Array = new Uint8Array(uint16.buffer);
    // return Buffer.from(uint8).toString('base64');

    // Buffer自带UTF8转码UTF16
    let buf = Buffer.from(utf8, 'utf16le'); // 此处'utf16le'指定将字符串转码为UTF-16编码
    return buf.toString('base64'); // 按字节进行Base64编码
}