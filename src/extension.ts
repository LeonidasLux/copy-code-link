import * as vscode from "vscode";
import { buildCodeLink } from "./codeLink";

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "copyCodeLink.copy",
    async () => {
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

      const relativePath = vscode.workspace.asRelativePath(document.uri);

      const selection = editor.selection;
      // 选区为空（仅光标）→ 输出光标所在行
      let startLine: number;
      let endLine: number;
      if (selection.isEmpty) {
        startLine = selection.start.line + 1;
        endLine = startLine;
      } else {
        startLine = selection.start.line + 1;
        endLine = selection.end.line + 1;
        // 选区末尾含换行（整行选择）时，结束行 -1 修正
        if (
          selection.end.character === 0 &&
          selection.end.line > selection.start.line
        ) {
          endLine -= 1;
        }
      }

      const link = buildCodeLink(relativePath, startLine, endLine);
      try {
        await vscode.env.clipboard.writeText(link);
      } catch {
        vscode.window.showErrorMessage("复制到剪贴板失败");
        return;
      }
      vscode.window.setStatusBarMessage(`已复制代码链接 ${link}`, 3000);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {
  // no-op
}
