# Food Catalogue Backend

This is a FastAPI backend for a food catalogue application.

## Setup

1.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Environment Variables:**
    Create a `.env` file based on `.env.example` and fill in your database URL and secret key.

3.  **Run the application:**
    ```bash
    uvicorn main:app --reload
    ```

## API Documentation

Access the API documentation at `/documentation` after running the application.

## Known Bugs (Intentionally Introduced)

This application contains several intentional bugs for demonstration and learning purposes. These include:

*   **Security Vulnerabilities:** Insecure default secret key, missing authentication/authorization on many endpoints, weak password handling.
*   **Data Integrity Issues:** Lack of validation for unique names, foreign key constraints not fully handled on deletion.
*   **Performance Problems:** Inefficient CRUD operations.
*   **Missing Features:** No proper error handling, no database migrations, no initial data seeding.
*   **Architectural Flaws:** Use of deprecated SQLAlchemy features, inconsistent dependency injection.

**DO NOT USE THIS CODE IN PRODUCTION.**
