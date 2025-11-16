import { test, expect } from "vitest";
import { getApp } from "../helper";

test("default root route", async (t) => {
    const app = await getApp();

  const res = await app.inject({
    url: "/",
  });
  expect(JSON.parse(res.payload)).toEqual({ root: true });
});
