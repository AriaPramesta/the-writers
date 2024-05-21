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
    return c.json({ message: "Ops! Writer not found" });
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

app.delete("/writers", (c) => {
  writers = [];

  return c.json({ message: "All writers have been deleted" });
});

app.delete("/writers/:id", (c) => {
  const id = Number(c.req.param("id"));
  const writer = writers.find((writer) => writer.id === id);

  if (!writer) {
    c.status(404);
    return c.json({ message: "Ops! Writer not found" });
  }

  const updatedWriters = writers.filter((writer) => writer.id !== id);
  writers = updatedWriters;

  return c.json({ message: `Writer id:${id} have been deleted` });
});

app.put("/writers/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const writer = writers.find((writer) => writer.id === id);

  if (!writer) {
    c.status(404);
    return c.json({ message: "Ops! Writer not found" });
  }

  const newWriter = {
    ...writer,
    name: body.name || writer.name,
    birthDate: body.birthDate || writer.birthDate,
    country: body.country || writer.country,
    popularBook: body.popularBook || writer.popularBook,
  };

  const updatedWriters = writers.map((writer) => {
    if (writer.id === id) {
      return newWriter;
    } else {
      return writer;
    }
  });

  writers = updatedWriters;

  return c.json({
    message: `Writer with id: ${id} have been updated`,
    writer: newWriter,
  });
});

console.log("The Writers API is running");

export default app;
