import { Hono } from "hono";

import { Writer, dataWriters } from "./data/writers.ts";
import { client } from "./lib/db.ts";

let writersArray = dataWriters;

const app = new Hono();

await client.connect();

app.get("/", (c) => {
  return c.json({ message: "Welcome to The Writers!" });
});

app.get("/writers", async (c) => {
  const res = await client.query("SELECT * FROM writers");
  const writers = res.rows as Writer[];
  console.log(writers);
  return c.json(writers);
});

app.get("/writers/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const res = await client.query(`SELECT * FROM writers WHERE id  = ${id}`);
  console.log({ res: JSON.stringify(res) });

  const writer = res.rows[0] as Writer;

  if (!writer) {
    c.status(404);
    return c.json({ message: "Ops! Writer not found" });
  }

  return c.json(writer);
});

app.post("/writers", async (c) => {
  const body = await c.req.json();

  const nextId = writersArray[writersArray.length - 1].id + 1;

  const newWriter = {
    id: nextId,
    name: body.name,
    birthDate: body.birthDate,
    country: body.country,
    popularBook: body.popularBook,
  };

  writersArray = [...writersArray, newWriter];

  return c.json({ writer: newWriter });
});

app.delete("/writers", (c) => {
  writersArray = [];

  return c.json({ message: "All writers have been deleted" });
});

app.delete("/writers/:id", (c) => {
  const id = Number(c.req.param("id"));
  const writer = writersArray.find((writer) => writer.id === id);

  if (!writer) {
    c.status(404);
    return c.json({ message: "Ops! Writer not found" });
  }

  const updatedWriters = writersArray.filter((writer) => writer.id !== id);
  writersArray = updatedWriters;

  return c.json({ message: `Writer id:${id} have been deleted` });
});

app.put("/writers/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const writer = writersArray.find((writer) => writer.id === id);

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

  const updatedWriters = writersArray.map((writer) => {
    if (writer.id === id) {
      return newWriter;
    } else {
      return writer;
    }
  });

  writersArray = updatedWriters;

  return c.json({
    message: `Writer with id: ${id} have been updated`,
    writer: newWriter,
  });
});

console.log("The Writers API is running");

export default app;
