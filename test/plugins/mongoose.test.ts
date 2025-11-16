import { test } from "node:test";
import * as assert from "node:assert";

import Fastify from "fastify";
import mongoosePlugin from "../../src/plugins/mongoose";
import { ConnectionStates } from "mongoose";

test("support works standalone", async (t) => {
  const fastify = Fastify();
  // eslint-disable-next-line no-void
  void fastify.register(mongoosePlugin);
  await fastify.ready();

  assert.equal(
    fastify.mongooseService.mongoose.connection.readyState,
    ConnectionStates.connected
  );
});
