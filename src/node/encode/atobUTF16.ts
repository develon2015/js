/**
 * 解码UTF16编码的Base64字符串
 * @param base64 
 */
export function atobUTF16(base64: string): string {
    // 此处'base64'表示字符串base64的编码是Base64，应当按字节解码后存于Buffer中
    return Buffer.from(base64, 'base64').toString('utf16le'); // toString将utf16转为utf8
}