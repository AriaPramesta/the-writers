import { type Writer } from "@prisma/client";

export type DataWriter = Omit<Writer, "createdAt" | "updatedAt">;

export const dataWriters: DataWriter[] = [
  {
    id: 1,
    name: "Kahlil Gibran",
    birthDate: new Date("1883-01-06"),
    country: "America",
    popularBook: "The Prophet",
  },
  {
    id: 2,
    name: "Franz Kafka",
    birthDate: new Date("1883-07-03"),
    country: "Austria",
    popularBook: "The Metamorphosis",
  },
  {
    id: 3,
    name: "Pramoedya Ananta Toer",
    birthDate: new Date("1925-02-06"),
    country: "Indonesia",
    popularBook: "Tetralogi Buru",
  },
];
