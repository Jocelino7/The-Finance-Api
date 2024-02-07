Transaction Routes
1. Add Transaction

    HTTP Method: POST
    Route: /t/f/transactions/add

2. Update Transaction

    HTTP Method: PUT
    Route: /t/f/transactions/update

3. Get Transaction by ID

    HTTP Method: GET
    Route: /t/f/transactions/get/:id

4. Get All Transactions by User ID

    HTTP Method: GET
    Route: /t/f/transactions/getAll/:userId

5. Delete Transaction by ID

    HTTP Method: DELETE
    Route: /t/f/transactions/delete/:id

6. Delete Transaction in Batch

    HTTP Method: DELETE
    Route: /t/f/transactions/delete_batch/

7. Get Transaction Report

    HTTP Method: GET
    Route: /t/f/transactions/report/:userId/:month/:year

Source Fund Routes
1. Add Source Fund

    HTTP Method: POST
    Route: /t/f/sourcefunds/add

2. Update Source Fund

    HTTP Method: PUT
    Route: /t/f/sourcefunds/update

3. Get Source Fund by ID

    HTTP Method: GET
    Route: /t/f/sourcefunds/get/:id

4. Get All Source Funds by User ID

    HTTP Method: GET
    Route: /t/f/sourcefunds/getAll/:userId

5. Delete Source Fund by ID

    HTTP Method: DELETE
    Route: /t/f/sourcefunds/delete/:id

6. Delete Source Fund in Batch

    HTTP Method: DELETE
    Route: /t/f/sourcefunds/delete_batch/

Authentication Routes
1. Create User

    HTTP Method: POST
    Route: /t/f/auth/create

2. Upload File

    HTTP Method: POST
    Route: /t/f/auth/upload

3. Authenticate User

    HTTP Method: POST
    Route: /t/f/auth/authenticate

4. Delete User by ID

    HTTP Method: DELETE
    Route: /t/f/auth/delete/:id

5. Reset Email

    HTTP Method: GET
    Route: /t/f/auth/reset_email/:userId/

6. Update User

    HTTP Method: PUT
    Route: /t/f/auth/update

7. Refresh Token

    HTTP Method: GET
    Route: /t/f/auth/refresh/:refreshToken

8. Send Email Verification

    HTTP Method: GET
    Route: /t/f/auth/send_email_verification/:userId

9. Verify Email

    HTTP Method: GET
    Route: /t/f/auth/verify_email/:token

10. Check Email Verification Status

    HTTP Method: GET
    Route: /t/f/auth/is_email_verified/:userId/

11. Serve Uploaded File

    HTTP Method: GET
    Route: /t/f/auth/uploads/:filename/
    
How to run
clone the repository, type "npm ci" add the enviromental variables and a database connection string to your remote database to prisma.    

Additional Notes

    These routes handle various CRUD operations related to transactions and source funds within the specified base URL paths.
    Route parameters such as :id, :userId, :month, and :year are used to identify and filter records as necessary.
    The routes are secured with authentication middleware (verifyToken) to ensure only authorized users can access them.
    Some routes utilize additional middleware for request validation and caching.
    Ensure that the ./uploads/ directory contains the uploaded files and is accessible from the server for the /t/f/auth/uploads/:filename/ route to serve files correctly.

    
