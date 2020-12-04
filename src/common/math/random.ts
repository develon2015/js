/**
 * 返回[start, end]区间的随机数
 */
export function random(start: number, end: number): number {
    const d = Math.abs(end - start) + 1;
    const min = start <= end ? start : end;
    return min + Math.round(Math.random() * d) % d;
}
