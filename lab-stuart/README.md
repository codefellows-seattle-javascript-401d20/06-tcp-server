## Lab 06 - TCP Chat Server

This module imports the Node Net package to implement a TCP chat application where users may log on to the room via the host machine's localhost at port number 4000. Once entered, the user is assigned a nickname that's randonly generated via the Node Faker package's faker.internet.userName().

In addition to logging chat messages to the room, user's may utilize the following commands, each prefixed with the '@' character to signify an action is intended:

@quit - exits the current user chat session and leaves the room.
@list - returns a list of all the currently active socket (user) nicknames.
@nickname new_nickname_1982 (for example) - replaces the current user nickname with a new one.
@dm another_nickname (for example) - sends a direct message to the referenced user (or logs an error message if that user is unavailable).
