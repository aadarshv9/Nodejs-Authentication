# Nodejs-Authentication
 Authentication system which can be used as a starter code for creating any new application

OverView :-
Building this project helps me in understanding the process/work flow behind authentication and autherization of users using the website.

External Libraries:-
- GoogleCaptcha for integrating captcha during sign in/sign up

NPM Packages :-
- express for running server and creating routes
- mongoose ODM for interacting with mongoDB
- ejs for rendering view/html pages
- express-ejs-layouts to render partials and layouts
- Bcrypto for encrypting passwords.
- request for sending http request from server
- dotenv to configure .env file(used for storing sensitive information)
- passport for authentication
- passport-local-strategy for local authentication
- passport-google-oauth2-strategy for social authentication
- nodemailer for sending mail
- cookie-parser for parsing cookies
- express-session for encrypting session-cookie made by passport
- connect-mongo for storing session-cookie in DB to make them persistent
- node-sass-middleware for generating css from scss/sass
- connect-flash for setting notification messages in session-cookie
- generate-passwords for creating random passwords


Features  :-
- Sign up with email
- Sign in
- Sign out
- Reset password after sign in
- The password stored in the db to be encrypted
- Google login/signup
- Forgot password (generate a random password and send on email)
- Enable re-captcha on both sign up and log in



What I Have Implemented
- Creating server
- Handling server Requests
- Managing Routes
- Creating Actions
- Database Queries
- Working of template engines (EJS)
- Implementing Authentication using Passport
- Displaying notifications 

Folder Structure
    |__ProjectDir
        |__assets
        |   |__css
        |      |__ layout.css
        |      |__ footer.css
        |      |__ home.css
        |      |__ header.css
        |   |__images
        |      |__ Welcome-to-our-new-website.jpg
        |   |__js
        |__config
        |   |__ middleware.js
        |   |__ mongoose.js
        |   |__ nodemailer.js
        |   |__ passport-google-oauth2-strategy.js
        |   |__ passport-local-strategy.js
        |__controllers
        |   |__ home_controller.js
        |   |__ users_controller.js
        |__ mailers
            |__ password_mailer.js
        |__models
        |   |__ user.js
        |__routes
        |   |__ index.js
        |   |__ users.js
        |
        |__views
        |    |__ mailers
        |       |__ new_password.ejs
        |   |__ _footer.ejs
        |   |__ _header.ejs
        |   |__ forgot_password.ejs
        |   |__home.ejs
        |   |__layout.ejs
        |   |__ reset_password.ejs
        |   |__ user_home.ejs
        |   |__ user_profile.ejs
        |__ .gitignore
        |__ index.js
        |__ package-lock.json
        |__ package.json
        |__ ReadMe.md
        
Run Project
    npm start
