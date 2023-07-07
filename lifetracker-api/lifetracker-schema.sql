CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1)
);

CREATE TABLE nutrition (
    nutritionid SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    name TEXT NOT NULL,
    calories INT NOT NULL,
    category TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE exercise (
    exerciseID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    name TEXT NOT NULL,
    hours INT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE sleep (
    sleepID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    name TEXT NOT NULL,
    hours INT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW() NOT NULL
);
