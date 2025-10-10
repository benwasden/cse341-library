const request = require("supertest");

// Mock passport, github strategy to avoid oauth
jest.mock("passport", () => {
  const passthru = () => (req, res, next) => next();
  return {
    use: jest.fn(),
    initialize: passthru,
    session: passthru,
    authenticate: () => passthru,
    serializeUser: jest.fn(),
    deserializeUser: jest.fn(),
  };
});

jest.mock("passport-github2", () => ({
  Strategy: jest.fn(),
}));

// Mock db module
jest.mock("../data/database", () => ({
  getDatabase: () => ({
    db: () => ({
      collection: () => ({
        find: () => ({ toArray: () => Promise.resolve([{ _id: "1", title: "Mock Book" }]) })
      })
    })
  })
}));

const app = require("../server");

describe("GET /fiction/", () => {
  it("returns 200 and an array", async () => {
    const res = await request(app).get("/fiction/");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
