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
        find: (query) => ({
          collation: () => ({
            toArray: () =>
              Promise.resolve([{ _id: "1", title: "Mock Nonfiction", genre: query.genre }]),
          }),
        }),
      }),
    }),
  }),
}));

const app = require("../server");

describe("GET /nonfiction/genre/:genre", () => {
  it("returns 200 and nonfiction with matching genre", async () => {
    const res = await request(app).get("/nonfiction/genre/History");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].genre).toEqual("History");
  });

  it("returns 400 when genre is empty", async () => {
    const res = await request(app).get("/nonfiction/genre/%20");
    expect(res.status).toBe(400);
  });
});
