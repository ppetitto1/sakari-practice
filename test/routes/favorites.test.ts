import { test, expect } from "vitest";
import { getApp } from "../helper";

test("list favorites returns paginated items", async (t) => {
  const app = await getApp();

  const res = await app.inject({
    url: "/api/favorites?page=1&limit=2",
    method: "GET",
  });

  expect(res.statusCode).toBe(200);
  const body = JSON.parse(res.payload);
  expect(body).toHaveProperty("items");
  expect(Array.isArray(body.items)).toBe(true);
  expect(body).toHaveProperty("page");
  expect(body).toHaveProperty("limit");
});

test("upsert favorite creates or updates and returns item", async (t) => {
  const app = await getApp();

  const payload = {
    note: "Great read",
  };

  const createRes = await app.inject({
    url: "/api/books/OL82563W124124124/favorites",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.API_KEY || "test",
    },
    payload,
  });

  expect(createRes.statusCode).toBe(201);
  const created = JSON.parse(createRes.payload);
  expect(created.workId).toBe("OL82563W124124124");
});
