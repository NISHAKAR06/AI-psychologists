# Healspace

This is a full-stack web application that provides a platform for users to interact with AI-powered psychologists. The application is built with a React frontend and a Python backend using Django and FastAPI.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (or yarn)
- Python 3.x and pip

### Installation

**Frontend**

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

**Backend**

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3.  Activate the virtual environment:
    -   On Windows:
        ```sh
        venv\Scripts\activate
        ```
    -   On macOS and Linux:
        ```sh
        source venv/bin/activate
        ```
4.  Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

### Database Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Apply the database migrations:
    ```sh
    python manage.py migrate
    ```

## Running the application

**Backend**

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Start the Django development server:
    ```sh
    python manage.py runserver
    ```
    The Django API will be available at `http://localhost:8000`.

3.  In a separate terminal, start the FastAPI development server:
    ```sh
    uvicorn main_backend.fastapi_app:app --reload --port 8001
    ```
    The FastAPI application will be available at `http://localhost:8001`.

**Frontend**

1.  In a separate terminal, navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Start the development server:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Technologies Used

### Frontend

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool and development server for modern web projects.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **shadcn/ui:** A collection of re-usable components for React.

### Backend

-   **Django:** A high-level Python web framework that encourages rapid development and clean, pragmatic design.
-   **FastAPI:** A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
-   **Uvicorn:** An ASGI server implementation, for use with FastAPI.
-   **SQLite:** The default database for Django, used for development and testing.

## Conclusion

This project serves as a comprehensive example of a modern full-stack application. It is currently in a testing phase, with plans for future global deployment.
