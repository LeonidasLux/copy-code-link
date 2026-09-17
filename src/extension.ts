import * as vscode from "vscode";
import { buildCodeLink, PathMode, pickPath } from "./codeLink";

const MODE_LABEL: Record<PathMode, string> = {
  relative: "相对路径",
  absolute: "绝对路径",
};

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("copyCodeLink.copy", () =>
      copyCodeLink("relative")
    ),
    vscode.commands.registerCommand("copyCodeLink.copyAbsolute", () =>
      copyCodeLink("absolute")
    )
  );
}

async function copyCodeLink(mode: PathMode): Promise<void> {
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
  const filePath = pickPath(
    {
      relativePath: vscode.workspace.asRelativePath(document.uri),
      absolutePath: document.uri.fsPath,
    },
    mode
  );
  const link = buildCodeLink(filePath, startLine, endLine);

  try {
    await vscode.env.clipboard.writeText(link);
  } catch {
    vscode.window.showErrorMessage("复制到剪贴板失败");
    return;
  }
  vscode.window.setStatusBarMessage(
    `已复制${MODE_LABEL[mode]}链接 ${link}`,
    3000
  );
}

/** 选区 → 1 起始的行号区间。 */
function resolveLineRange(selection: vscode.Selection): {
  startLine: number;
  endLine: number;
} {
  // 选区为空（仅光标）→ 输出光标所在行
  if (selection.isEmpty) {
    const line = selection.start.line + 1;
    return { startLine: line, endLine: line };
  }

  const startLine = selection.start.line + 1;
  let endLine = selection.end.line + 1;
  // 选区末尾含换行（整行选择）时，结束行 -1 修正
  if (
    selection.end.character === 0 &&
    selection.end.line > selection.start.line
  ) {
    endLine -= 1;
  }
  return { startLine, endLine };
}

export function deactivate(): void {
  // no-op
}
