const request = require("supertest");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Hello from CSP-451" });
});
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
  });
});


module.exports = app;

/* istanbul ignore next -- bootstrap; only runs when invoked as `node src/app.js` */
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on ${port}`));
}
test("GET /health returns healthy status and uptime", async () => {
  const res = await request(app).get("/health");

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("healthy");
  expect(typeof res.body.uptime).toBe("number");
});
