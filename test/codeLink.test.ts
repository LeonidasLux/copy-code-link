import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCodeLink } from "../src/codeLink";

test("多行选区输出区间格式", () => {
  assert.equal(
    buildCodeLink("src/views/a.vue", 153, 159),
    "@src/views/a.vue#L153-159"
  );
});

test("单行输出单行格式不带区间", () => {
  assert.equal(
    buildCodeLink("src/views/a.vue", 153, 153),
    "@src/views/a.vue#L153"
  );
});

test("首行边界", () => {
  assert.equal(buildCodeLink("src/a.ts", 1, 1), "@src/a.ts#L1");
  assert.equal(buildCodeLink("src/a.ts", 1, 5), "@src/a.ts#L1-5");
});

test("绝对路径回退场景原样拼接", () => {
  assert.equal(
    buildCodeLink("/home/user/proj/src/a.ts", 1, 2),
    "@/home/user/proj/src/a.ts#L1-2"
  );
});
