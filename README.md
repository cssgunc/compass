# 🧭 Compass Center's Internal Resource Management App

## 🛠 Technologies

- Next.js
- TailwindCSS
- TypeScript
- Supabase

## 📁 File Setup

```
\compass
    \components // Components organized in folders related to specific pages
    \pages // Store all pages here
        \api // API routes
    \public // Local assets (minimize usage)
    \utils // Constants, Routes, Classes, Dummy Data
    \styles // CSS files
```

## 🚀 To Start

Follow these steps to set up your local environment:

```
\\ Clone this repository
git clone https://github.com/cssgunc/compass.git
\\ Go into main folder
cd compass
\\ Install dependencies
npm install
\\ Run local environment
npm run dev
```

Also add following variables inside of a .env file inside of the backend directory

```
\\ .env file contents

POSTGRES_DATABASE=compass
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_HOST=db
POSTGRES_PORT=5432
HOST=localhost
```

## Backend Starter

- Please open the VS Code Command Palette
- Run the command **Dev Containers: Rebuild and Reopen in Container**
- This should open the dev container with the same file directory mounted so any changes in the dev container will be seen in the local repo

### In Dev Container

Run this to reset the database and populate it with the approprate tables that reflect the entities folder
```
python3 -m backend.script.reset_demo
```

### Possible Dev Container Errors

- Sometimes the ports allocated to our services will be allocated (5432 for Postgres and 5050 for PgAdmin4)
- Run **docker stop** to stop all containers
- If that does not work using **sudo lsof -i :[PORT_NUMBER]** to find the process running on the needed ports and idenitfy the PID
- Run **sudo kill [PID]**
- If you are on Windows please consult ChatGPT or set up WSL (will be very useful in the future)

### Accesing pgAdmin 4

- First go to http://localhost:5050/ on your browser
- Log in using the credentials admin@example.com and admin
- Click **Add New Server**
- Fill in the name field with Compass (can be anything)
- Click **Connection** tab and fill in the following:
  - Host name/address: db
  - Maintence database: compass
  - Username: postgres
  - Password: admin
- Click **Save** at the bottom to add connection
- Click **Server** dropdown on the left and click through items inside the **Compass** server

### Testing Backend Code

- Write tests for any service you create and any function in those services
- Make sure to add docstrings detailing what the file is doing and what each test is doing
- Name all test functions with test\_[testContent] (Must be prefixed with test to be recognized by pytest)
- Utitlize dependency injection for commonly used services

```
\\ Run all tests by being in the backend directory
pytest

\\ Run specific tests by passing in file as a parameter
\\ Passing the -s allows us to see any print statements or debugging statements in the console
pytest -s --rootdir=/workspace [testFilePath]::[testFunctionSignature]
```

## 💡 Dev Notes

- For each task, create a branch in the format '[your name]-[ticket number]-[task description]'
- Only commit your work to that branch and then make a git request to '/main'
- When creating new files in the backend and code is in python make sure to add a docstring for the file and any function you create ("""[content]"""")
