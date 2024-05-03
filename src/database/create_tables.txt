-- Create User table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR,
    "lastName" VARCHAR,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR DEFAULT 'user'
);

-- Create Hotel table
CREATE TABLE "hotel" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "url" VARCHAR,
    "description" VARCHAR,
    "keywords" VARCHAR[],
    "price" INT,
    "chatBot_key" VARCHAR NOT NULL
);

-- Create Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL
);

-- Create Business table
CREATE TABLE "business" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR,
    "url" VARCHAR,
    "image" VARCHAR,
    "description" VARCHAR,
    "keywords" VARCHAR[],
    "price" INT,
    "categoryId" INT,
    "hotelId" INT,
    FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE,
    FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE
);

-- Create SearchQuery table
CREATE TABLE "search_query" (
    "id" SERIAL PRIMARY KEY,
    "text" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "hotelId" INT,
    FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE
);
