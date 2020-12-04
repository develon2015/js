/**
 * 在异步函数中休眠n毫秒
 * ```
 * ;(async () => {
 *     await sleep(1000);
 *     doSomething();
 * })();
 * ```
 * @param n 
 */
export async function sleep(n): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), n);
    });
}
