# Javascript-test

To run this program, follow these steps:
1) $docker pull mongo
2) $docker run --name temp-mongo -d -p 127.0.0.1:27017:27017 mongo
(if this mongo address is already being used, remove the connection with $docker rm name. "name" is the name of the connection already in use)

Now that the database is connected, run the program itself, using:
$npm start
(to stop the program, kill the process with ctrl-c in bash)

Postman was used to test the HTTP requests
