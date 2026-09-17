# Copy Code Link

按快捷键将**选中代码片段**或**光标所在行**拷贝为代码链接，支持两种路径口径：

| 拷贝方式 | 快捷键 | 输出示例 |
| --- | --- | --- |
| 相对路径链接 | `Ctrl+Alt+C` | `src/views/security-inspection/video-inspection-section.vue#L153-159` |
| 绝对路径链接 | `Ctrl+Alt+Shift+C` | `/home/user/proj/src/views/security-inspection/video-inspection-section.vue#L153-159` |

- 多行选区 → `#L153-159`（区间）
- 单行选区或仅光标 → `#L153`（单行）
- 链接格式为 `路径#L行号`，**不带 `@` 前缀**
- 相对路径为当前工作区根目录相对路径（多根工作区自动取包含该文件的工作区）；文件不在任何工作区内时回退为绝对路径
- 绝对路径为文件系统绝对路径，路径分隔符统一为 `/`

## 快捷键

默认：`Ctrl+Alt+C`（相对路径）、`Ctrl+Alt+Shift+C`（绝对路径），编辑器获得焦点时生效。

### 修改快捷键

`Ctrl+Shift+P` → 打开键盘快捷方式（`keybindings.json`），添加或覆盖：

```json
[
  {
    "key": "ctrl+alt+l",
    "command": "copyCodeLink.copy",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+alt+shift+l",
    "command": "copyCodeLink.copyAbsolute",
    "when": "editorTextFocus"
  }
]
```

也可在命令面板 `Ctrl+Shift+P` 直接搜索 "Copy Code Link"，选择对应命令执行。

## 快速安装指南

### 方式一：源码调试（开发）

```bash
git clone https://github.com/LeonidasLux/copy-code-link.git
cd copy-code-link
npm install
npm run compile
```

VS Code 中打开该目录，按 `F5` 启动 Extension Development Host，在新窗口中试用。

### 方式二：VSIX 打包安装（分享给同事）

```bash
npm install -g @vscode/vsce
git clone https://github.com/LeonidasLux/copy-code-link.git
cd copy-code-link
npm run compile
vsce package
code --install-extension copy-code-link-0.1.0.vsix
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
2. 按 `Ctrl+Alt+C` 拷贝相对路径链接，或 `Ctrl+Alt+Shift+C` 拷贝绝对路径链接。
3. 粘贴得到 `路径#L起-止` 格式链接。

状态栏会闪现提示，例如 `已复制相对路径链接 src/views/a.vue#L153-159`。

## 项目结构

```
src/codeLink.ts    # 纯函数：路径选择（相对/绝对）+ 链接拼接
src/extension.ts   # 激活、两个命令注册、选区→行号、剪贴板写入
test/codeLink.test.ts
```

命令 ID：`copyCodeLink.copy`（相对）、`copyCodeLink.copyAbsolute`（绝对）。

## 开发

```bash
npm test        # 编译 + 纯函数单测（node --test）
npm run compile # 仅编译
```

## 发布到 VS Code 扩展市场（维护者）

前置条件：已在 [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage) 创建 publisher（本扩展为 `YuanLonghui`），并生成了带 **Marketplace → Manage** 权限、组织选 **All accessible organizations** 的 Azure DevOps PAT。

```bash
npm run compile
vsce verify-pat YuanLonghui -p "<PAT>"   # 先验证 PAT 与 publisher 是否配套
vsce publish -p "<PAT>"                  # 发布；加 minor/major/patch 可自动升版本
```

> 提示：本机无 keyring 服务时 `vsce login` 会回退到明文文件存储且交互提示可能卡住，直接使用 `-p` 或 `VSCE_PAT` 环境变量更省事。

## 许可证

[MIT](LICENSE)
