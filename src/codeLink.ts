/**
 * 构造代码链接：@相对路径#L起[-止]
 * startLine / endLine 为 1 起始。
 */
export function buildCodeLink(
  relativePath: string,
  startLine: number,
  endLine: number
): string {
  if (startLine === endLine) {
    return `@${relativePath}#L${startLine}`;
  }
  return `@${relativePath}#L${startLine}-${endLine}`;
}
