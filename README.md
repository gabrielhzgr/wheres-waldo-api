# wheres-waldo-api

Express app for playing where's waldo game. Used prisma ORM for the db,
the images urls and coordinates of the characters are stored in postgresql.
When starting a new game the user is provided with a signed cookie
with startTime in ms,when they place a character the game verifies if it
was correct and if all were guessed sends another cookie with the endTime.
The user can record their time if they wish, this route verifies if it has
valid signed cookies, startTime, endTime and recordId so they can do so.
