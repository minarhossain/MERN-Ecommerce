# E-commerce MERN Stack Project

// module system = require('dotenv').config();

// import system from
// import dotenv from 'dotenv';
// dotenv.config({path:'./env'})

## Basic Setup

1.  Planing for e-commerce
2.  Environment Setup 
3.  Create Express Server
4.  HTTP Request and response
5. Nodemon and morgan (HTTP request logger middleware for node.js) package install
    morgan - api request ar upor console print korba get/post/put/delete request kina
6. Test Api With Postman
7. Middleware (simple is loggedIn middleware creating and texting for api purpose)
8. Express Error Handling Middleware: -> body-parser
9. Handling all project and create and Error : -> http-errors
10. Secure the api : -> xss-clean, express-rate-limit( আমরা একটা এপিআই তে বার বার রিকুয়েস্ট করি তাহলে এক মিনিটে আমাদের রিকুয়েস্ট কন্ডিশন সংখ্যার বেশি হলে মেসেজ দিবে যেমন এক মিনিটে পাচ বার এর বেশি হলে যদি কন্ডিশন দেয় তাহলে এই মেসেজ দিবে)

11. configure dotenv and create .env and declare secret file for security
12. MVC Architecture 
13. Mongodb database connection with mongoose (mongodb atlas and mongodb shell)

14. userSchema and userModel (mongodb is a bson data format) for User
15. create seed route for testing and inserting some dummy data in database
16. GET api/users -> isAdmin -> getAllUsers -> searchByName + pagination Functionality from database 

17. responseHandler controller for error or success
18. get a single user by his id GET/:id -> api/users/:id 
19. How to create services in the backend (findById()) anek bar khujar darkar hote pare tai amra akta alada 'service' folder create kore bar bar user korta pari

20. DELETE a user by his id api/users/:id
21. Refactoring findWithId take Model to find Model theka
22. delete image helper (database related we use service and otehr wise we use helper)
23. POST /api/users -> create an user
24. create jwt function for using again time
25. prepare smtp and email sending environment
26. send email with nodemailer
27. Post : api/users/verify -> verify + register in to database
28. How to upload image from backend file management that means image audio video pdf msdocs ppx etc (multer package install)
29. File size and file type filtering
30. Refactoring file uploading
31. express-validator using for form input field validation (validators folder index.js and auth.js after that user userRegistration route)
32. storing image as buffering
33. updateUserById put method 
34. user login with jwt and set token in the cookie
35. user logout controller
36. logged in Middleware