make sure docker is runing.

run database container.
    docker compose up -d db

check if it is up and runing:
    docker compose logs
and
   docker ps -a

You can create a new connection using the following parameters:

    Host: localhost
    Port: 5432
    Database: postgres
    User: postgres
    Password: postgres

build container with app. use command
   docker compose build

runing the procject:
    docker compose up kotlinapp

now the tha appliasion is runing and you can conact and interact with the db