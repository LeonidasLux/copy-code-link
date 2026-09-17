"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const strict_1 = __importDefault(require("node:assert/strict"));
const codeLink_1 = require("../src/codeLink");
const workspaceFile = {
    relativePath: "src/views/a.vue",
    absolutePath: "/home/user/proj/src/views/a.vue",
};
(0, node_test_1.test)("多行选区输出区间格式", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/views/a.vue", 153, 159), "src/views/a.vue#L153-159");
});
(0, node_test_1.test)("单行输出单行格式不带区间", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/views/a.vue", 153, 153), "src/views/a.vue#L153");
});
(0, node_test_1.test)("首行边界", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/a.ts", 1, 1), "src/a.ts#L1");
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/a.ts", 1, 5), "src/a.ts#L1-5");
});
(0, node_test_1.test)("链接不带 @ 前缀", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("/home/user/proj/src/a.ts", 1, 2), "/home/user/proj/src/a.ts#L1-2");
    strict_1.default.ok(!(0, codeLink_1.buildCodeLink)("src/views/a.vue", 153, 159).includes("@"));
});
(0, node_test_1.test)("相对路径模式取工作区相对路径", () => {
    strict_1.default.equal((0, codeLink_1.pickPath)(workspaceFile, "relative"), "src/views/a.vue");
    strict_1.default.equal((0, codeLink_1.buildCodeLink)((0, codeLink_1.pickPath)(workspaceFile, "relative"), 153, 159), "src/views/a.vue#L153-159");
});
(0, node_test_1.test)("绝对路径模式取文件系统绝对路径", () => {
    strict_1.default.equal((0, codeLink_1.pickPath)(workspaceFile, "absolute"), "/home/user/proj/src/views/a.vue");
    strict_1.default.equal((0, codeLink_1.buildCodeLink)((0, codeLink_1.pickPath)(workspaceFile, "absolute"), 153, 159), "/home/user/proj/src/views/a.vue#L153-159");
});
(0, node_test_1.test)("文件不在工作区时相对路径模式回退为绝对路径", () => {
    const outside = {
        relativePath: "/tmp/other/b.ts",
        absolutePath: "/tmp/other/b.ts",
    };
    strict_1.default.equal((0, codeLink_1.buildCodeLink)((0, codeLink_1.pickPath)(outside, "relative"), 1, 2), "/tmp/other/b.ts#L1-2");
});
(0, node_test_1.test)("Windows 反斜杠路径统一为 /", () => {
    const win = {
        relativePath: "src\\views\\a.vue",
        absolutePath: "C:\\proj\\src\\views\\a.vue",
    };
    strict_1.default.equal((0, codeLink_1.pickPath)(win, "relative"), "src/views/a.vue");
    strict_1.default.equal((0, codeLink_1.pickPath)(win, "absolute"), "C:/proj/src/views/a.vue");
});
//# sourceMappingURL=codeLink.test.js.map