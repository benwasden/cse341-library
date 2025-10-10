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
              Promise.resolve([{ _id: "1", title: "Mock Comic", genre: query.genre }]),
          }),
        }),
      }),
    }),
  }),
}));

const app = require("../server");

describe("GET /comics/genre/:genre", () => {
  it("returns 200 and comics with matching genre", async () => {
    const res = await request(app).get("/comics/genre/Superhero");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].genre).toEqual("Superhero");
  });

  it("returns 400 when genre is empty/whitespace", async () => {
    const res = await request(app).get("/comics/genre/%20");
    expect(res.status).toBe(400);
  });
});
