type Writer = {
  id: number;
  name: string;
  birthDate?: string;
  country?: string;
  popularBook?: string;
};

export const dataWriters: Writer[] = [
  {
    id: 1,
    name: "Kahlil Gibran",
    birthDate: "6-January-1883",
    country: "America",
    popularBook: "The Prophet",
  },
  {
    id: 2,
    name: "Franz Kafka",
    birthDate: "3-July-1883",
    country: "Austria",
    popularBook: "The Metamorphosis",
  },
  {
    id: 3,
    name: "Pramoedya Ananta Toer",
    birthDate: "6-February-1925",
    country: "Indonesia",
    popularBook: "Tetralogi Buru",
  },
];
