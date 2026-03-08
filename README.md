# Team Management Dashboard

## Features
- Add and manage employees
- Add departments and projects
- Admin dashboard

## Backend Setup (Django)

# How to Run
1. cd Folder where the manage.py is.
2. Create venv: python -m venv venv
OR Activate VirtualEnvironment(if already created): .\venv\Scripts\activate.
3. Install Dependencies: pip install -r requirements.txt (disregard if already installed).
4. Apply DB migrations: python manage.py migrate/py manage.py migrate.
5. Run development server: python manage.py runserver/py manage.py runserver.

The API will be available at http://127.0.0.1:8000/

## Frontend Setup (React/NPM)

# How to Run
1. Navigate to the frontend directory: cd frontend.
2. Install dependencies: npm install.
3. Start the development server: npm run start/npm start.

The frontend will be available at http://localhost:3000/

