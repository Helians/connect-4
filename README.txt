Instructions to run the application:

1. Make sure node and npm is installed
2. Unzip the folder
3. Go inside connect-4 folder using 'cd connect-4'
4. Run the command 'npm install' to install all the dependencies
5. Run 'npm start' to locally start the application
6. Go to the browser and enter: localhost:3030
7. It will redirect to '/start' to start the game and respond with 'Ready'
8. After localhost:3030 , type /:move (:move value range -> 0 to 6) eg: localhost:3030/1 (will put the value in 2nd column) 
9. Response can be either of the following: Valid,Invalid,Yellow Wins,Red Wins,Draw: Game Over


Hosted/Deployed links:

https://connect4-api.herokuapp.com/

https://connect4-api.herokuapp.com/start

https://connect4-api.herokuapp.com/:move   (value of :move range from 0 to 6)