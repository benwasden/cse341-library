const request = require("supertest");

// mock passport/github strat/ dbmodule to avoid oauth
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

jest.mock("../data/database", () => ({
  getDatabase: () => ({
    db: () => ({
      collection: () => ({
        find: () => ({ toArray: () => Promise.resolve([{ _id: "1", title: "Mock Nonfiction" }]) })
      })
    })
  })
}));

const app = require("../server");

describe("GET /nonfiction/", () => {
  it("returns 200 and an array", async () => {
    const res = await request(app).get("/nonfiction/");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe("Mock Nonfiction");
  });
});
