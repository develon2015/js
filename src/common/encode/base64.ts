/**
 * 构造DataURL字符串
 * @param base64 
 * @param type 
 */
export function Base64ToDataURL(base64: string, type: string = 'application/octet-stream'): string {
    return `data:${type};base64,${base64}`;
}