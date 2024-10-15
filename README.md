Step 1: (installs dependicies)
- npm i

Step 2: (To Build the containers and images on docker)
  - To build:
    - Docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
  - To Remove container:
    - Docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down

Step 3: (to test the back-end server using postman)
  - To test sign Up:
    - select the method to POST
    - hit this url: http://localhost:3000/api/v1/users/signUp
    - select body >> select raw >> select JSON
    - pass this in JSON format
   
              {
                "userName": "someusername",
                "email": "example@gmail.com",
                "password": "somepawssword"
              }
  - To test login:
    - select the method to POST
    - hit this url: http://localhost:3000/api/v1/users/login
    - select body >> select raw >> select JSON
    - pass this in JSON format
   
              {
                "email": "example@somthing.com",
                "password": "sometext"
              }

