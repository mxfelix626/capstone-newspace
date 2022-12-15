
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    image_url text,
    body text NOT NULL,
    posted_at timestamp with time zone NOT NULL,
    posted_by text NOT NULL REFERENCES users(username)
);

CREATE TABLE usersfavoriteposts(
    username VARCHAR (25),
    post_id  int
)
