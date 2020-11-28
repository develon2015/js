// 字符串相关

/**
 * 使用`window.TextDecoder`与`util.TextDecoder`解析字符串.
 * @param buffer 
 * @param encoding 
 */
export
function openUTF8(buffer: ArrayBuffer | Buffer, encoding: 'utf-8' | 'utf-16' | 'utf-16le' | 'utf-16be' | 'gbk' | 'gb2312') {
    return new TextDecoder(encoding).decode(buffer, { stream: false });
}
