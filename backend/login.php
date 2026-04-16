<?php

  /* TO-DO: Include database-connection.php to connect to the database
          Hint: Use require_once to ensure the file is only loaded once.
                Load this before any redirects or login logic.
                Both header.php and database-connection.php are inside the includes folder
  */

  require_once('database-connection.php');


  /* TO-DO: Include session.php to handle login sessions
          Hint: Use require_once to avoid redeclaring functions if the file is loaded elsewhere.
                Load this before any redirects or login logic.
                Both header.php and session.php are inside the includes folder
  */

  require_once('session.php');

  
  if ($logged_in) {                                       // If already logged in  
    header('Location: profile.php');                     // Redirect to profile page 
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
      header('Location: profile.php');       // Redirect to profile page 
      exit;                                 // Stop further code running 
    }
  }

    
  /* TO-DO: Include header.php
            Hint: Include this AFTER redirects so that HTML output does not break header() functions.
                  header.php is inside the includes folder and already connects to the database
  */
  require_once('includes/header.php');
?> 

<div id="content" class="login-container animate-bottom">
    <h1>Log In</h1>
    <hr />

    <form method="POST" action="login.php" class="login-form">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>

        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>

        <div class="form-group">
            <input type="submit" value="Log In" class="submit-btn">
        </div>
    </form>
</div>

<?php include 'includes/footer.php'; ?>