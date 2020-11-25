/**
 * 获取字符串的二进制表示形式
 * @param str 
 */
export async function String2BinaryView(str: string): Promise<string[]> {
    let blob = new Blob([str]);
    let buffer: ArrayBuffer = await blob.arrayBuffer();
    let arr = new Uint8Array(buffer); // 按字节读取内存
    let view: string[] = Array.prototype.map.call(arr, it => { // ArrayBuffer的map等函数被重写了，只能返回number以修改本身
        let bin =  it.toString(2) as string;
        let zero = 8 - bin.length; // 补零
        return `0x${'0'.repeat(zero)}${bin}`;
    });
    return view;
}