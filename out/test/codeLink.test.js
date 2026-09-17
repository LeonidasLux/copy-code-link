"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const strict_1 = __importDefault(require("node:assert/strict"));
const codeLink_1 = require("../src/codeLink");
(0, node_test_1.test)("多行选区输出区间格式", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/views/a.vue", 153, 159), "@src/views/a.vue#L153-159");
});
(0, node_test_1.test)("单行输出单行格式不带区间", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/views/a.vue", 153, 153), "@src/views/a.vue#L153");
});
(0, node_test_1.test)("首行边界", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/a.ts", 1, 1), "@src/a.ts#L1");
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("src/a.ts", 1, 5), "@src/a.ts#L1-5");
});
(0, node_test_1.test)("绝对路径回退场景原样拼接", () => {
    strict_1.default.equal((0, codeLink_1.buildCodeLink)("/home/user/proj/src/a.ts", 1, 2), "@/home/user/proj/src/a.ts#L1-2");
});
//# sourceMappingURL=codeLink.test.js.map