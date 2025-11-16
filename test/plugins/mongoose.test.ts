import { test, expect } from "vitest";

import { getApp } from "../helper";

test("mongoose plugin loads and is available", async (t) => {
  const app = await getApp();

  expect(app.mongooseService.getReadyState()).toBe(1);
  await app.mongooseService.disconnect();
  expect(app.mongooseService.getReadyState()).toBe(0);
});
