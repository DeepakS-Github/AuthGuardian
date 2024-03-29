# AuthGuardian - Next.js Web Application

Welcome to AuthGuardian, your go-to platform for secure user authentication and interaction. This Next.js web application allows users to sign up, log in, and view their details. AuthGuardian also provides a mechanism for users to verify their accounts, ensuring a secure and trustworthy environment.

## Features

1. **User Authentication:** Sign up and log in securely to access your personalized account.

2. **Profile Details:** View your details, including name, email, verification status, and account creation date.

3. **User Verification:** Verify your account by clicking on the "Verify" button in the navbar. An email with a verification link will be sent to your registered email address.

4. **User Table:** Once verified, access the / route to view a table containing details of other users, such as name, email, verification status, and account creation date.

5. **Logout:** Safely log out of your account with the "Logout" button in the navbar.

6. **Delete Account:** Permanently delete your account by clicking on the "Delete Account" button below your profile details. A confirmation modal will appear before the account deletion.

7. **Dark Mode/Light Mode:** Switch between dark and light modes using the radio buttons in the navbar for a personalized experience.

8. **Notifications:** Utilizing React Toastify for better notification handling throughout the application.

## Implementation

- **Access Token:** Upon successful login, an access token is generated and stored in a cookie with a one-hour expiry time.

- **JWT Token:** Passwords are securely encoded using JWT tokens.

- **Token Expiry Check:** APIs perform checks on the access token's expiry, notifying users via React Toastify if it has expired.

- **User Verification:** Verification emails are sent to users with a verification link. The link contains a verification token, which is decoded and validated on the /verify route.

## Technologies Used

1. **Tailwind CSS:** A utility-first CSS framework for creating responsive and efficient designs.

2. **Next.js:** A React framework for building server-rendered and statically generated web applications.

3. **MongoDB:** A NoSQL database used for storing user data securely.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file at the root of the project.
4. Add the following variables to your `.env` file:
   
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_TOKEN=your_jwt_secret
   GMAIL_ID=your_gmail_id
   GMAIL_TOKEN=your_appkey_token
5. Run the application using `npm run dev`.

Make sure to replace `your_mongodb_uri`, `your_jwt_secret`, `your_gmail_id`, and `your_appkey_token` with your actual MongoDB URI, JWT secret, Gmail ID, and Gmail token, respectively. Users should follow the instructions carefully to set up the environment variables needed for the application to function correctly.

## Support and Contact

If you encounter any issues, have questions, or need assistance, please feel free to contact me. Your feedback is valuable, and I'm here to help!


Feel free to explore, contribute, and make AuthGuardian even better!


