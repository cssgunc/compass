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

POSTGRES_DB=compass
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_HOST=db
POSTGRES_PORT=5432
HOST=localhost
```

Install necessary python packages

```
\\ Change directory from compass into backend directory
cd backend

\\ Install python dependencies
pip3 install -r requirements.txt
```

## Backend Starter

Follow these steps to start up Postgres database:

Make sure you have Docker installed!

```

\\ Spins up local postgres database and pgadmin
docker-compose up -d

\\ Stop and teardown containers
docker-compose down

\\ Stop and teardown containers + volumes (full reset)
docker-compose down -v
```

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

## Testing Backend Code

- Write tests for any service you create and any function in those services
- Make sure to add docstrings detailing what the file is doing and what each test is doing
- Name all test functions with test\_[testContent]()
- Utitlize dependency injection for commonly used services

```
\\ Run all tests by being in the backend directory
pytest

\\ Run specific tests by passing in file as a parameter
pytest [fileName]
```

## 💡 Dev Notes

- For each task, create a branch in the format '[your name]-[ticket number]-[task description]'
- Only commit your work to that branch and then make a git request to '/main'
- When creating new files in the backend and code is in python make sure to add a docstring for the file and any function you create ("""[content]"""")
