// This file contains code that we reuse between our tests.
import "dotenv/config";
import * as path from "node:path";
import { beforeAll, afterAll } from "vitest";
const helper = require("fastify-cli/helper.js");
import { FastifyInstance } from "fastify";

export type TestContext = {};

let app: FastifyInstance;

beforeAll(async () => {
  app = await build({});
});

afterAll(async () => {
  await app.close();
});

export async function getApp() {
  if (!app) {
    app = await build({});
  }
  return app;
}

// Prefer built JS for tests to avoid ts-node; fall back to TS in dev contexts
const DistAppPath = path.join(__dirname, "..", "dist", "src", "app.js");
const SrcAppPath = path.join(__dirname, "..", "src", "app.ts");
const AppPath = process.env.USE_TS_APP === "1" ? SrcAppPath : DistAppPath;

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {
    skipOverride: true, // Register our application with fastify-plugin
  };
}

// Automatically build and tear down our instance
async function build(t: TestContext) {
  // you can set all the options supported by the fastify CLI command
  // Enable Fastify logs at debug to surface errors during tests
  const argv = [AppPath, "-l", "debug", "-P"];

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await helper.build(argv, config());

  return app;
}

export { config, build };
