DROP TABLE IF EXISTS todos;

-- INT or INTEGER or SERIAL -> 32bit number
-- BIGINT or BIGINTEGER or BIGSERIAL -> 64bit number
CREATE TABLE todos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    todo_item TEXT NOT NULL,
    date BIGINT NOT NULL,
    importance TEXT NOT NULL
);
