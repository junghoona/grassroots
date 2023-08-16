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
            email VARCHAR(100) NOT NULL,
            password VARCHAR(50) NOT NULL
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
            creator_id INTEGER NOT NULL REFERENCES users(id)
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
            city VARCHAR NOT NULL,
            state VARCHAR NOT NULL,
            type VARCHAR(300),
            description TEXT,
            creator_id INTEGER NOT NULL REFERENCES users(id),
            community INTEGER NOT NULL REFERENCES communities(id),
            day DATE NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL
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
            community INTEGER NOT NULL REFERENCES communities(id),
            person INTEGER NOT NULL REFERENCES users(id)
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
            event INTEGER NOT NULL REFERENCES events(id),
            person INTEGER NOT NULL REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE attendees;
        """
    ]
]
