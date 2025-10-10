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

jest.mock("mongodb", () => {
  class ObjectId {
    constructor(id) { this.id = id; }
    static isValid(id) { return /^[a-f\d]{24}$/i.test(id); }
  }
  return { ObjectId };
});

jest.mock("../data/database", () => {
  const doc = {
    _id: "507f1f77bcf86cd799439011",
    group_name: "Mock Group",
    genre_focus: "Fantasy",
  };
  return {
    getDatabase: () => ({
      db: () => ({
        collection: () => ({
          findOne: (q) => Promise.resolve(q._id?.id === doc._id ? doc : null),
          find: (q) => ({
            toArray: () =>
              Promise.resolve(q._id?.id === doc._id ? [doc] : []),
          }),
        }),
      }),
    }),
  };
});

const app = require("../server");

describe("GET /groups/:id", () => {
  it("400 on invalid id", async () => {
    const res = await request(app).get("/groups/not-a-valid-id");
    expect(res.status).toBe(400);
  });

  it("200 on valid id", async () => {
    const id = "507f1f77bcf86cd799439011";
    const res = await request(app).get(`/groups/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.group_name).toBe("Mock Group");
  });
});
