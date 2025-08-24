# Full-Stack Web Application with Django, FastAPI, and React

This repository contains a full-stack web application featuring a Django backend for core functionalities, a FastAPI backend for AI model integration, and a frontend built with React.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Accessing the Application](#accessing-the-application)

## Project Overview

This project is a modern web application featuring:

-   **Main Backend**: A robust API built with Django, handling core application logic, data storage, and WebSocket communication.
-   **AI Backend**: A lightweight FastAPI server dedicated to serving AI models.
-   **Frontend**: A dynamic and responsive user interface created with React, Vite, and Tailwind CSS.

## Technologies Used

### Backend

-   [Django](https://www.djangoproject.com/) & [Django Channels](https://channels.readthedocs.io/en/stable/) (Main Server)
-   [FastAPI](https://fastapi.tiangolo.com/) (AI Model Server)
-   [Python 3.x](https://www.python.org/)

### Frontend

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [React Router](https://reactrouter.com/)
-   [Axios](https://axios-http.com/)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   [Python](https://www.python.org/downloads/) (version 3.8 or higher)
-   [Node.js](https://nodejs.org/) (version 14 or higher) and [Yarn](https://yarnpkg.com/)
-   A configured database (default is SQLite)

## Getting Started

Follow these steps to set up the project locally.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv venv
    venv\\Scripts\\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install the required Node.js packages:**
    ```bash
    yarn install
    ```

## Running the Application

You will need to run the Django, FastAPI, and frontend servers in separate terminals.

1.  **Run the Main Backend Server (Django with Channels):**
    -   Navigate to the `backend` directory.
    -   Ensure your virtual environment is activated.
    -   Apply the database migrations:
        ```bash
        python manage.py migrate
        ```
    -   Start the Django ASGI server using Uvicorn:
        ```bash
        uvicorn main_backend.asgi:application --reload --port 8000
        ```
    -   The main backend API will be running at `http://127.0.0.1:8000`.

2.  **Run the AI Backend Server (FastAPI):**
    -   Navigate to the `backend` directory.
    -   Ensure your virtual environment is activated.
    -   Start the FastAPI server using Uvicorn on a different port (e.g., 8001):
        ```bash
        uvicorn main_backend.fastapi_app:app --reload --port 8001
        ```
    -   The AI backend will be running at `http://127.0.0.1:8001`.

3.  **Run the Frontend Development Server:**
    -   Navigate to the `frontend` directory.
    -   Start the Vite development server:
        ```bash
        yarn dev
        ```
    -   The frontend application will be accessible in your browser. The terminal will display the local URL, typically `http://localhost:5173`.

## Accessing the Application

-   **API Endpoints**: The API endpoints are available under the `/api/` path. For example, `http://127.0.0.1:8000/api/psychologists/`.
-   **Django Admin**: You can access the Django admin interface at `http://127.0.0.1:8000/admin/`. You will need to create a superuser first: `python manage.py createsuperuser`.
-   **Web Application**: Open your web browser and navigate to the URL provided by the Vite development server (e.g., `http://localhost:5173`) to use the application.
