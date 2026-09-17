import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCodeLink, pickPath } from "../src/codeLink";

const workspaceFile = {
  relativePath: "src/views/a.vue",
  absolutePath: "/home/user/proj/src/views/a.vue",
};

test("多行选区输出区间格式", () => {
  assert.equal(
    buildCodeLink("src/views/a.vue", 153, 159),
    "src/views/a.vue#L153-159"
  );
});

test("单行输出单行格式不带区间", () => {
  assert.equal(
    buildCodeLink("src/views/a.vue", 153, 153),
    "src/views/a.vue#L153"
  );
});

test("首行边界", () => {
  assert.equal(buildCodeLink("src/a.ts", 1, 1), "src/a.ts#L1");
  assert.equal(buildCodeLink("src/a.ts", 1, 5), "src/a.ts#L1-5");
});

test("链接不带 @ 前缀", () => {
  assert.equal(
    buildCodeLink("/home/user/proj/src/a.ts", 1, 2),
    "/home/user/proj/src/a.ts#L1-2"
  );
  assert.ok(!buildCodeLink("src/views/a.vue", 153, 159).includes("@"));
});

test("相对路径模式取工作区相对路径", () => {
  assert.equal(pickPath(workspaceFile, "relative"), "src/views/a.vue");
  assert.equal(
    buildCodeLink(pickPath(workspaceFile, "relative"), 153, 159),
    "src/views/a.vue#L153-159"
  );
});

test("绝对路径模式取文件系统绝对路径", () => {
  assert.equal(
    pickPath(workspaceFile, "absolute"),
    "/home/user/proj/src/views/a.vue"
  );
  assert.equal(
    buildCodeLink(pickPath(workspaceFile, "absolute"), 153, 159),
    "/home/user/proj/src/views/a.vue#L153-159"
  );
});

test("文件不在工作区时相对路径模式回退为绝对路径", () => {
  const outside = {
    relativePath: "/tmp/other/b.ts",
    absolutePath: "/tmp/other/b.ts",
  };
  assert.equal(
    buildCodeLink(pickPath(outside, "relative"), 1, 2),
    "/tmp/other/b.ts#L1-2"
  );
});

test("Windows 反斜杠路径统一为 /", () => {
  const win = {
    relativePath: "src\\views\\a.vue",
    absolutePath: "C:\\proj\\src\\views\\a.vue",
  };
  assert.equal(pickPath(win, "relative"), "src/views/a.vue");
  assert.equal(pickPath(win, "absolute"), "C:/proj/src/views/a.vue");
});
