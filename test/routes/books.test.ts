import { test, expect } from "vitest";
import { getApp } from "../helper";

test("list books returns paginated items", async (t) => {
  const app = await getApp();

  const res = await app.inject({
    url: "/api/books?page=1&limit=2",
    method: "GET",
  });

  expect(res.statusCode).toBe(200);
  const body = JSON.parse(res.payload);
  expect(body).toHaveProperty("items");
  expect(Array.isArray(body.items)).toBe(true);
  expect(body).toHaveProperty("page", "1");
  expect(body).toHaveProperty("limit", "2");
});

test("upsert book and fetch by workId", async (t) => {
  const app = await getApp();

  const payload = {
    workId: "TEST_WORK_ID_1",
    title: "Test Book",
    authors: ["Tester"],
    firstPublishYear: 2024,
  };

  const createRes = await app.inject({
    url: "/api/books",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.API_KEY || "test-api-key",
    },
    payload,
  });

  expect(createRes.statusCode).toBe(201);
  const created = JSON.parse(createRes.payload);
  expect(created.title).toBe(payload.title);
  expect(created.authors).toEqual(payload.authors);

  const getRes = await app.inject({
    url: `/api/books/${payload.workId}`,
    method: "GET",
  });
  expect(getRes.statusCode).toBe(200);
  const got = JSON.parse(getRes.payload);
  expect(got.workId).toBe(payload.workId);
});
