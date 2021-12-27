// src/mocks/handlers.js
import { rest } from "msw";

const Scoops = [
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
  },
  {
    name: "Vanilla",
    imagePath: "/images/vanilla.png",
  },
];

export const handlers = [
  rest.get("/login", (req, res, ctx) => {
    return res(ctx.json(Scoops));
  }),
];
