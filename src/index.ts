import { Hono } from "hono";

import { Writer, dataWriters } from "./data/writers.ts";
import { prisma } from "./lib/db.ts";

// let writersArray = dataWriters;

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Welcome to The Writers!" });
});

app.get("/writers", async (c) => {
  const writers = await prisma.writer.findMany();

  return c.json(writers);
});

app.get("/writers/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const writer = await prisma.writer.findUnique({
    where: { id },
  });

  if (!writer) {
    c.status(404);
    return c.json({ message: "Ops! Writer not found" });
  }

  return c.json(writer);
});

app.post("/writers", async (c) => {
  const body = await c.req.json();

  const dataWriter = {
    name: body.name,
  };

  const writer = await prisma.writer.create({
    data: dataWriter,
  });

  return c.json({ writer });
});

app.delete("/writers", async (c) => {
  const result = await prisma.writer.deleteMany();

  return c.json({
    message: "All writers have been deleted",
    result,
  });
});

app.delete("/writers/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const deletedWriter = await prisma.writer.delete({
    where: { id },
  });

  return c.json({
    message: `Writer id:${id} have been deleted`,
    deletedWriter,
  });
});

app.put("/writers/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const dataWriter = {
    name: body.name,
  };

  const updatedWriter = await prisma.writer.update({
    where: { id },
    data: dataWriter,
  });

  return c.json({
    message: `Writer with id: ${id} have been updated`,
    updatedWriter,
  });
});

console.log("The Writers API is running");

export default app;
