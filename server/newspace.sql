\echo 'Delete and recreate newspace db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE newspace;
CREATE DATABASE newspace;
\connect newspace

\i newspace-schema.sql
\i newspace-seed.sql

\echo 'Delete and recreate newspace_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE newspace_test;
CREATE DATABASE newspace_test;
\connect newspace_test

\i newspace-schema.sql
