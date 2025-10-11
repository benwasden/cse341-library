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
              Promise.resolve([{ _id: "1", title: "Mock NonFiction", author_lname: query.author_lname }]),
          }),
        }),
      }),
    }),
  }),
}));

const app = require("../server");

describe("GET /nonfiction/author/:author_lname", () => {
  it("returns 200 and nonfiction with matching author", async () => {
    const res = await request(app).get("/nonfiction/author/Cain");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].author_lname).toEqual("Cain");
  });

  it("returns 400 when author is empty", async () => {
    const res = await request(app).get("/nonfiction/author/%20");
    expect(res.status).toBe(400);
  });
});
