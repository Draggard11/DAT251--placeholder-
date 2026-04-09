Backend Setup Guide
===================

Before you start, make sure Docker is running.

1) Start the database
---------------------

Run the PostgreSQL container:

    docker compose up -d db

Check that it is running:

    docker compose logs db
    docker ps -a

2) Database connection settings
-------------------------------

Use these values when creating a database connection:

    Host: localhost
    Port: 5432
    Database: postgres
    User: postgres
    Password: postgres

3) Build the application container
----------------------------------

    docker compose build

4) Run the backend application
------------------------------

    docker compose up kotlinapp

The application should now be running and connected to the database.

5) Reset the database
---------------------

If you need to reset the database completely (remove all data and recreate it):

    docker compose down -v
    docker compose up -d db

Warning: `docker compose down -v` deletes database volumes and all stored data.