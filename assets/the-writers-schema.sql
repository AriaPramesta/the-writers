CREATE TABLE "writers" (
  "id" integer PRIMARY KEY,
  "name" varchar(100),
  "birthDate" date,
  "country" varchar(100),
  "popularBook" varchar(100),
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "books" (
  "id" integer PRIMARY KEY,
  "writer_id" integer,
  "title" varchar(100),
  "synopsis" varchar(500),
  "created_at" datetime,
  "updated_at" datetime
);

ALTER TABLE "books" ADD FOREIGN KEY ("writer_id") REFERENCES "writers" ("id");
