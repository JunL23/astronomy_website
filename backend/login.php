<?php

  /* TO-DO: Include database-connection.php to connect to the database
          Hint: Use require_once to ensure the file is only loaded once.
                Load this before any redirects or login logic.
                Both header.php and database-connection.php are inside the includes folder
  */

  header('Access-Control-Allow-Origin: https://junrongliu.rhody.dev');
  header('Access-Control-Allow-Methods: POST');
  // needed due to frontend and backend living in different port
  // this will allow cookies to be send, allowing session to persist
  header('Access-Control-Allow-Credentials: true');

  require_once('database-connection.php');


  /* TO-DO: Include session.php to handle login sessions
          Hint: Use require_once to avoid redeclaring functions if the file is loaded elsewhere.
                Load this before any redirects or login logic.
                Both header.php and session.php are inside the includes folder
  */

  require_once('session.php');

  
  if ($logged_in) {                                       // If already logged in  
    // header('Location: profile.php');                     // Redirect to profile page 
    exit;                                               // Stop further code running
  }    



  if ($_SERVER["REQUEST_METHOD"] == "POST") {         // Check if the form was submitted
    $username = $_POST['username'];                  // Get the username the user sent
    $password = $_POST['password'];                 // Get the password the user sent



    /* TO-DO: Call authenticate() function to verify the username and password
              Pass the appropriate arguments (hint: use variables given above)
              Store the returned value in a variable called $user

              Hint: You defined authenticate() earlier in session.php
    */

    $user = authenticate($pdo, $username, $password);

    if ($user) {                               // If user data returned
      login($user);                           // Call the login function to update session data                                             
      echo "Success";
      exit;                                 // Stop further code running 
    }
    echo "Error in sign in";
  }