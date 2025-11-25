# Social Media Appify

This is a social media application with a React/Next.js frontend and a Node.js/Express.js backend.

## Prerequisites

*   Node.js (v18 or later)
*   npm

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd social-media-appify
```

### 2. Set Up Environment Variables

#### Backend

In the `backend` directory, create a file named `.env` and add the following variables. You will also need to update `backend/connect.js` to use these variables.

```
FRONTEND_BASE_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret

BACKEND_PORT_ADDRESS=8000

# Database Connection
DB_USER=<your-db-user-name>
DB_HOST=localhost
DB_DATABASE=social_appify
DB_PASSWORD=<your-db-password>
DB_PORT=5432
```

#### Frontend

In the `frontend` directory, create a file named `.env.local` and add the following variable:

```
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:8800
```

### 3. Database Setup

This project uses PostgreSQL.

1.  **Install PostgreSQL** if you don't have it installed.
2.  **Create a new database** named `social_appify`. You can use the following command:
    ```bash
    createdb social_appify
    ```
3.  **Restore the database** from the dump file provided in the `database` directory. Run the following command from the root of the project:
    ```bash
    psql -U postgres -d social_appify -f database/appify_social_db
    ```
    You may be prompted for the password for the `postgres` user.

### 4. Set Up the Backend

The backend server uses Node.js and Express.

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the backend server:
    ```bash
    npm start
    ```

The backend server will be running on `http://localhost:8800`.

### 4. Set Up the Frontend

The frontend is a Next.js application.

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

The frontend application will be running on `http://localhost:3000`.

## Running the Application

*   **Backend**: The backend server must be running for the frontend to function correctly. Follow the steps above to start the backend server.
*   **Frontend**: Once the backend is running, start the frontend development server. You can then access the application in your browser at `http://localhost:3000`.
