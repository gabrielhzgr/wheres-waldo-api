# wheres-waldo-api

_ExpressJS_ app for playing where's waldo game. Used _prisma ORM_ for the db.
The images urls and coordinates of the characters are stored in _postgresql_.

When starting a new game the user is provided with a signed cookie
with startTime in ms,when they place a character the game verifies if it was correct and if all were guessed sends another cookie with the endTime.

The user can record their time if they wish, this route verifies if it has valid signed cookies, startTime, endTime and recordId so they can do so.

Used by: https://github.com/gabrielhzgr/wheres-waldo-view
