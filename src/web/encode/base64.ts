import { Base64ToDataURL, UTF8ToUTF16 } from './';

/**
 * 很明显，有时候JavaScript代码需要快速并轻松处理原始二进制数据。
 * 过去，必须通过将原始数据视为字符串并使用该charCodeAt()方法从数据缓冲区读取字节来模拟这种情况。
 * 
 * btoa()不能直接编码UTF-8字符, 可以使用ArrayBuffer转换为BinaryString.
 * @param buffer 
 */
export function ArrayBuffer2Base64(buffer: ArrayBuffer): string {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    // 将原始二进制数据按字节转换, 拼接为二进制字符串
    for (var i = 0; i < len; i++) {
        if (len - i > 70) { // 减少binary拼接次数
          binary += String.fromCharCode(bytes[i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i],
            bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i],
            bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i],
            bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i],
            bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i],
            bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i],
            bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i], bytes[++i],
          );
        } else if (len - i > 5) { // 减少binary拼接次数
            binary += String.fromCharCode(bytes[i], bytes[++i], bytes[++i], bytes[++i], bytes[++i]);
        } else {
            binary += String.fromCharCode(bytes[i]);
        }
    }
    return window.btoa(binary);
}

/**
 * 将Blob对象(File基于Blob)转换为Base64编码.
 * @param blob File或`new Blob([string])`等Blob对象
 */
export async function Blob2Base64(blob: Blob): Promise<string> {
    let arrayBuffer = await blob.arrayBuffer();
    return ArrayBuffer2Base64(arrayBuffer);
}

/**
 * 将UTF-8字符串编码为Base64字符串
 * String => Blob => ArrayBuffer => Uint8Array => BinaryString => btoa()
 * @param str 
 */
export async function String2Base64(str: string): Promise<string> {
    return Blob2Base64(new Blob([str]));
}

/**
 * Base64字符串创建blob URL
 * @param base64 
 * @param type 
 */
export async function Base64ToObjectURL(base64: string, type: string = 'application/octet-stream'): Promise<string> {
    return DataURL2ObjectURL(Base64ToDataURL(base64, type));
}

/**
 * 使用Base64编码的DataURL创建blob URL
 * @param data 
 */
export async function DataURL2ObjectURL(data: string): Promise<string> {
    let blob: Blob = await (await fetch(data)).blob();
    return URL.createObjectURL(blob);
}

/*\
|*|
|*|  Base64 / binary data / UTF-8 strings utilities (#3)
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
|*|
|*|  Author: madmurphy
|*|
\*/

/**
 * UTF-8字符串转为以UTF-16（LE）编码存储的Base64编码
 * 
 * MDN解决方案＃3 JavaScript的UTF-16 =>二进制字符串=> base64
 * 
 * 存在长度限制（调用栈限制）（已修复）
 * @param sString 
 */
export function btoaUTF16(sString: string) {
    // var aUTF16CodeUnits = new Uint16Array(sString.length);
    // Array.prototype.forEach.call(aUTF16CodeUnits, function (el, idx, arr) { arr[idx] = sString.charCodeAt(idx); });
    // return btoa(String.fromCharCode.apply(null, new Uint8Array(aUTF16CodeUnits.buffer)));

    const uint16: Uint16Array = UTF8ToUTF16(sString);
    const buffer: ArrayBuffer = uint16.buffer;
    return ArrayBuffer2Base64(buffer);
}

export function atobUTF16(sBase64: string): string {
    // var sBinaryString = atob(sBase64), aBinaryView = new Uint8Array(sBinaryString.length);
    // Array.prototype.forEach.call(aBinaryView, function (el, idx, arr) { arr[idx] = sBinaryString.charCodeAt(idx); });
    // return String.fromCharCode.apply(null, new Uint16Array(aBinaryView.buffer));

    /* view: Array(6) 示例：四字节字符'\u{2F804}'的UTF-16+Base64经过atob解码后的binaryStr视图
        0: "0B01111110" => 126
        1: "0B11000011" => 216(UTF-8)
        2: "0B10011000"
        3: "0B00000100" => 4
        4: "0B11000011" => 220
        5: "0B10011100" */
    const binaryStr: string = atob(sBase64); // UTF16编码，要转UTF-8
    let decodeStr = '';
    // btoaUTF16('\u{2F804}') => "ftgE3A==" => atobUTF16('ftgE3A==') => {binaryStr: "~ØÜ", length: 4}
    let uint8 = new Uint8Array(binaryStr.length);
    for (let i = 0; i < uint8.length; i++) {
        uint8[i] = binaryStr.charCodeAt(i);
    }
    /* uint8: Uint8Array(4)
        0: 126 => 01111110
        1: 216 => 11011000
        2: 4   => 00000100
        3: 220 => 11011100 */
    let uint16 = new Uint16Array(uint8.buffer);
    /* uint16: Uint16Array(2)
        0: 55422 => 0B11011000_01111110
        1: 56324 => 0B11011100_00000100 */
    for (let i = 0; i < uint16.length; i++) {
        decodeStr += String.fromCharCode(uint16[i]);
    }
    return decodeStr;
}

/**
 * MDN解决方案＃4 –在编码之前先转义字符串
 * 
 * `btoa()`函数的UTF-8支持
 */
export function b2a(binary: string) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which can be fed into btoa.
    return btoa(encodeURIComponent(binary)/*%xx%xx%xx*/.replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode(Number.parseInt('0x' + p1));
        })
    );
}

/**
 * MDN解决方案＃4 –在编码之前先转义字符串
 * 
 * `atob()`函数的UTF-8支持
 * @param ascii 
 */
export function a2b(ascii: string) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(ascii).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
