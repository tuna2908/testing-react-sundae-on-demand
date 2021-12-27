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

const Toppings = [
  {
    name: "Cherries",
    imagePath: "/images/cherries.png",
  },
  {
    name: "M&Ms",
    imagePath: "/images/m-and-ms.png",
  },
  {
    name: "Hot fudge",
    imagePath: "/images/hot-fudge.png",
  },
];

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(ctx.json(Scoops));
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(ctx.json(Toppings));
  }),
];
