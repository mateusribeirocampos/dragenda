import { test, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

describe("health check", () => {
  test("GET /health returns 200 and ok status", async () => {
    const res = await request(app).get("/health");
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { status: "ok" });
  });
});

describe("JSON body parsing", () => {
  test("malformed JSON body returns 400", async () => {
    const res = await request(app)
      .post("/users/register")
      .set("Content-Type", "application/json")
      .send("{bad json");
    assert.equal(res.status, 400);
  });
});

describe("404 handling", () => {
  test("unknown route returns 404", async () => {
    const res = await request(app).get("/rota-inexistente");
    assert.equal(res.status, 404);
  });
});

describe("auth middleware (token.js ValidateToken)", () => {
  test("protected route without Authorization header returns 401", async () => {
    const res = await request(app).get("/doctors");
    assert.equal(res.status, 401);
    assert.equal(res.body.error, "Token não informado");
  });

  test("protected route with invalid token returns 401", async () => {
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", "Bearer token-invalido");
    assert.equal(res.status, 401);
    assert.equal(res.body.error, "Token inválido!");
  });
});

describe("CORS", () => {
  test("allowed origin gets access-control-allow-origin header", async () => {
    const res = await request(app)
      .get("/health")
      .set("Origin", "http://localhost:3000");
    assert.equal(res.headers["access-control-allow-origin"], "http://localhost:3000");
    assert.equal(res.headers["access-control-allow-credentials"], "true");
  });

  test("disallowed origin gets no access-control-allow-origin header", async () => {
    const res = await request(app)
      .get("/health")
      .set("Origin", "http://evil.example.com");
    assert.equal(res.headers["access-control-allow-origin"], undefined);
  });
});

describe("rate limit headers", () => {
  test("general limiter attaches RateLimit headers on a limited route", async () => {
    const res = await request(app).get("/doctors");
    assert.ok(
      res.headers["ratelimit-limit"] !== undefined || res.headers["x-ratelimit-limit"] !== undefined,
      "expected RateLimit-Limit or X-RateLimit-Limit header to be present"
    );
  });
});
