import { builtinModules } from "module";

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