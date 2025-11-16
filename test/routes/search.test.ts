import { test, expect } from "vitest";
import { getApp } from "../helper";

test("search route returns books", async (t) => {
  const app = await getApp();

  const res = await app.inject({
    url: "/api/search?query=lord+of+the+rings&page=1&limit=10",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  });

  expect(res.statusCode).toBe(200);
  const body = JSON.parse(res.payload);
  expect(body.items).toBeTruthy();
  expect(Array.isArray(body.items)).toBe(true);
  if (body.items.length > 0) {
    expect(body.items[0].title).toBeTruthy();
    expect(Array.isArray(body.items[0].authors)).toBe(true);
  }
});
