/**
 * 拷贝模式：
 * - relative：工作区相对路径（文件不在任何工作区内时回退为绝对路径）
 * - absolute：文件系统绝对路径
 */
export type PathMode = "relative" | "absolute";

export interface CodeLinkPaths {
  /** 工作区相对路径；文件不在任何工作区内时为绝对路径。 */
  relativePath: string;
  /** 文件系统绝对路径。 */
  absolutePath: string;
}

/** 统一使用 `/` 作为分隔符，避免 Windows 反斜杠出现在链接里。 */
export function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, "/");
}

/** 按拷贝模式挑选用于拼接链接的路径。 */
export function pickPath(paths: CodeLinkPaths, mode: PathMode): string {
  return normalizePath(
    mode === "absolute" ? paths.absolutePath : paths.relativePath
  );
}

/**
 * 构造代码链接：路径#L起[-止]
 * startLine / endLine 为 1 起始，链接不带 `@` 前缀。
 */
export function buildCodeLink(
  filePath: string,
  startLine: number,
  endLine: number
): string {
  const path = normalizePath(filePath);
  if (startLine === endLine) {
    return `${path}#L${startLine}`;
  }
  return `${path}#L${startLine}-${endLine}`;
}
