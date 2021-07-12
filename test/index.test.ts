import { test, expect } from "@jest/globals";
import { getRegistry } from "../source/get-registry";

test("list", async () => {
  const { error, registry } = await getRegistry();
  expect(error).toBe(undefined);
  expect(registry).toBe("https://registry.yarnpkg.com");
});
