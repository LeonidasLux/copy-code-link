"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = normalizePath;
exports.pickPath = pickPath;
exports.buildCodeLink = buildCodeLink;
/** 统一使用 `/` 作为分隔符，避免 Windows 反斜杠出现在链接里。 */
function normalizePath(filePath) {
    return filePath.replace(/\\/g, "/");
}
/** 按拷贝模式挑选用于拼接链接的路径。 */
function pickPath(paths, mode) {
    return normalizePath(mode === "absolute" ? paths.absolutePath : paths.relativePath);
}
/**
 * 构造代码链接：路径#L起[-止]
 * startLine / endLine 为 1 起始，链接不带 `@` 前缀。
 */
function buildCodeLink(filePath, startLine, endLine) {
    const path = normalizePath(filePath);
    if (startLine === endLine) {
        return `${path}#L${startLine}`;
    }
    return `${path}#L${startLine}-${endLine}`;
}
//# sourceMappingURL=codeLink.js.map