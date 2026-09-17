"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCodeLink = buildCodeLink;
/**
 * 构造代码链接：@相对路径#L起[-止]
 * startLine / endLine 为 1 起始。
 */
function buildCodeLink(relativePath, startLine, endLine) {
    if (startLine === endLine) {
        return `@${relativePath}#L${startLine}`;
    }
    return `@${relativePath}#L${startLine}-${endLine}`;
}
//# sourceMappingURL=codeLink.js.map