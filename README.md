# 🧭 Compass Center's Internal Resource Management App

## 🛠 Technologies

- Next.js
- TailwindCSS
- TypeScript
- Supabase

## 📁 File Setup

```
\backend
    \api // Define API routes
    \entities // Define entities in database
    \models // How objects are represented in Python
    \script // Scripts for init and demo
    \services // Main business logic
    \test // Testing suite
    
\compass
    \components // Components organized in folders related to specific pages
    \pages // Store all pages here
        \api // API routes
    \public // Local assets (minimize usage)
    \utils // Constants, Routes, Classes, Dummy Data
    \styles // CSS files
```

## 🚀 To Start

Follow these steps to set up your local environment (Dev Container):

```
\\ Clone this repository
git clone https://github.com/cssgunc/compass.git

\\ Create .env file for frontend
cd compass
touch .env

\\ Create .env file for backend
cd ../backend
touch .env
```

**Backend .env** Contents:

```
POSTGRES_DATABASE=compass
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_HOST=db
POSTGRES_PORT=5432
HOST=localhost
```

**Frontend (compass) .env** Contents:

```
NEXT_PUBLIC_SUPABASE_URL=[ASK_TECH_LEAD]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ASK_TECH_LEAD]
NEXT_PUBLIC_API_HOST=http://localhost:8000
NEXT_PUBLIC_HOST=http://localhost:3000
```

## Dev Container Setup

- Please open the VS Code Command Palette (Mac - Cmd+Shift+P and Windows - Ctrl+Shift+P)
- Run the command **Dev Containers: Rebuild and Reopen in Container**
- This should open the dev container with the same file directory mounted so any changes in the dev container will be seen in the local repo
- The dev container is sucessfully opened once you can see file directory getting populated

### In Dev Container Setup

Open a new terminal and run these commands in sequence to setup the dependencies and database
```
cd backend
python3 -m backend.script.reset_demo

cd ../compass
npm ci
```

## Starting up website and backend

Open a terminal and run these commands:

```
cd backend
fastapi dev main.py
```

Open another terminal and run these commands:

```
cd compass
npm run dev
```

1. Go to [localhost:3000/auth/login](localhost:3000/auth/login)
2. Login with username: root@compass.com, password: compass123
3. Explore website

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
