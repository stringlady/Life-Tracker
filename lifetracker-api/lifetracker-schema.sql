DROP TABLE users;
DROP TABLE nutrition;
DROP TABLE exercise;
DROP TABLE sleep;
DROP TABLE activity;

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
    createdAt DATE DEFAULT NOW() NOT NULL
);

CREATE TABLE exercise (
    exerciseID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    name TEXT NOT NULL,
    duration INT NOT NULL,
    intensity INT NOT NULL,
    createdAt DATE DEFAULT NOW() NOT NULL
);

CREATE TABLE sleep (
    sleepID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    name TEXT NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    createdAt DATE DEFAULT NOW() NOT NULL
);

CREATE TABLE activity (
    activityid SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    avgCals INT,
    avgDur INT,
    avgHours INT
);