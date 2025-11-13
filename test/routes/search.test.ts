import { test } from "node:test";
import * as assert from "node:assert";
import { build } from "../helper";

test("search route returns books", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/api/search?query=lord+of+the+rings",
    headers: {
      "x-api-key": process.env.API_KEY || "test-api-key",
    },
  });

  assert.equal(res.statusCode, 200);
  const body = JSON.parse(res.payload);
  assert.ok(body.items);
  assert.ok(Array.isArray(body.items));
  if (body.items.length > 0) {
    assert.ok(body.items[0].title);
    assert.ok(Array.isArray(body.items[0].authors));
  }
});
