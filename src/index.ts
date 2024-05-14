import { Hono } from "hono";

import { dataWriters } from "./data/writers";

let writers = dataWriters;

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Welcome to The Writers!" });
});

app.get("/writers", (c) => {
  return c.json(writers);
});

app.get("/writers/:id", (c) => {
  const id = Number(c.req.param("id"));

  const writer = writers.find((writer) => writer.id === id);

  if (!writer) {
    c.status(404);
    return c.json({ message: "Writer not found" });
  }

  return c.json(writer);
});

app.post("/writers", async (c) => {
  const body = await c.req.json();

  const nextId = writers[writers.length - 1].id + 1;

  const newWriter = {
    id: nextId,
    name: body.name,
    birthDate: body.birthDate,
    country: body.country,
    popularBook: body.popularBook,
  };

  writers = [...writers, newWriter];

  return c.json({ writer: newWriter });
});

export default app;
