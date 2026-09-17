# Copy Code Link

按快捷键将**选中代码片段**或**光标所在行**拷贝为代码链接：

```
@src/views/saiwei-park/views/security-inspection/video-inspection-section.vue#L153-159
```

- 多行选区 → `#L153-159`（区间）
- 单行选区或仅光标 → `#L153`（单行）
- 路径为当前工作区根目录相对路径（多根工作区自动取包含该文件的工作区）

## 快捷键

默认：`Ctrl+Alt+C`（编辑器获得焦点时生效）。

### 修改快捷键

`Ctrl+Shift+P` → 打开键盘快捷方式（`keybindings.json`），添加或覆盖：

```json
{
  "key": "ctrl+alt+shift+c",
  "command": "copyCodeLink.copy",
  "when": "editorTextFocus"
}
```

## 快速安装指南

### 方式一：源码调试（开发）

```bash
cd copy-code-link
npm install
npm run compile
```

VS Code 中打开该目录，按 `F5` 启动 Extension Development Host，在新窗口中试用。

### 方式二：VSIX 打包安装（分享给同事）

```bash
npm install -g @vscode/vsce
cd copy-code-link
npm run compile
vsce package
code --install-extension copy-code-link-0.0.1.vsix
```

注：无 repository/LICENSE 时 vsce 会输出 WARNING，可忽略，不影响生成 .vsix。

### 方式三：目录安装（本机免打包）

```bash
cd copy-code-link
npm install
npm run compile
mkdir -p ~/.vscode/extensions
ln -sfn "$PWD" ~/.vscode/extensions/copy-code-link
```

重启 VS Code 生效。

## 使用

1. 打开一个文件，选中多行（或把光标放到某一行）。
2. 按 `Ctrl+Alt+C`。
3. 粘贴得到 `@路径#L起-止` 格式链接。

## 开发

```bash
npm test        # 编译 + 纯函数单测（node --test）
npm run compile # 仅编译
```
