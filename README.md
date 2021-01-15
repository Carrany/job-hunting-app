# Job Hunting App

A simple app to view submitted job applications 

Setup

## Steps include:

1. Clone the repo.

2. Install the dependencies :

    Install dependencies 
     cd to client
     ```bash
     npm install
     npm install -g json-server
     ```

3. Create a .env file in the root folder or rename .env_example to .env .

4. To run the app:

     cd to client
     ```bash
     npm start
     ```
     to start json server, cd to server
     ```bash
     json-server --watch db.json
     ```

    Client runs on **http://localhost:7000** 
    Server runs on **http://localhost:3000** 

5. Additional Info:

   The technologies used were geared towards displaying job applications per candidate. Many improvements could be done to the project with more time, e.g. authentication and an application process by a candidate could easily be implemented


## Built With
ReactJs