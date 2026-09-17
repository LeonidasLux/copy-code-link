"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const codeLink_1 = require("./codeLink");
const MODE_LABEL = {
    relative: "相对路径",
    absolute: "绝对路径",
};
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("copyCodeLink.copy", () => copyCodeLink("relative")), vscode.commands.registerCommand("copyCodeLink.copyAbsolute", () => copyCodeLink("absolute")));
}
async function copyCodeLink(mode) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage("没有活动编辑器");
        return;
    }
    const document = editor.document;
    if (document.uri.scheme === "untitled") {
        vscode.window.showWarningMessage("文件未保存，无法生成链接");
        return;
    }
    const { startLine, endLine } = resolveLineRange(editor.selection);
    const filePath = (0, codeLink_1.pickPath)({
        relativePath: vscode.workspace.asRelativePath(document.uri),
        absolutePath: document.uri.fsPath,
    }, mode);
    const link = (0, codeLink_1.buildCodeLink)(filePath, startLine, endLine);
    try {
        await vscode.env.clipboard.writeText(link);
    }
    catch {
        vscode.window.showErrorMessage("复制到剪贴板失败");
        return;
    }
    vscode.window.setStatusBarMessage(`已复制${MODE_LABEL[mode]}链接 ${link}`, 3000);
}
/** 选区 → 1 起始的行号区间。 */
function resolveLineRange(selection) {
    // 选区为空（仅光标）→ 输出光标所在行
    if (selection.isEmpty) {
        const line = selection.start.line + 1;
        return { startLine: line, endLine: line };
    }
    const startLine = selection.start.line + 1;
    let endLine = selection.end.line + 1;
    // 选区末尾含换行（整行选择）时，结束行 -1 修正
    if (selection.end.character === 0 &&
        selection.end.line > selection.start.line) {
        endLine -= 1;
    }
    return { startLine, endLine };
}
function deactivate() {
    // no-op
}
//# sourceMappingURL=extension.js.map