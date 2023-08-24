steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            avatar VARCHAR(300),
            bio TEXT,
            city VARCHAR NOT NULL,
            state VARCHAR NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            hashed_password TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE communities (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            city VARCHAR NOT NULL,
            state VARCHAR NOT NULL,
            type VARCHAR(300),
            description TEXT,
            creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE communities;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            location VARCHAR(50) NOT NULL,
            city VARCHAR NOT NULL,
            state VARCHAR NOT NULL,
            type VARCHAR(300) NOT NULL,
            description TEXT NOT NULL,
            creator INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            community INTEGER NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
            day VARCHAR(50) NOT NULL,
            start_time VARCHAR(50) NOT NULL,
            end_time VARCHAR(50) NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE members (
            id SERIAL PRIMARY KEY NOT NULL,
            community INTEGER NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
            person INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE members;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE attendees (
            id SERIAL PRIMARY KEY NOT NULL,
            event INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
            person INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE attendees;
        """
    ]
]
