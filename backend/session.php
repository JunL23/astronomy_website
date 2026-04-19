<?php

	// Persist session cookie for 30 days
	// this is needed because react and php lives in a different port
	// in different port, closing the website will potentially clear the session
	// causing user needing to log in everytime, which is not optimal
    $lifetime = 60 * 60 * 24 * 30;
    ini_set('session.gc_maxlifetime', (string)$lifetime);

    session_set_cookie_params([
        'lifetime' => $lifetime,
        'path' => '/',
        'secure' => false,   // true if HTTPS
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

	session_start();										// Start/renew session									 	
	$logged_in = $_SESSION['logged_in'] ?? false; 			// Is user logged in?      



	function login($user)									// Remember user passed login
	{
    	session_regenerate_id(true); 						// Update session id

	    $_SESSION['logged_in'] = true;						// Set logged_in key to true
	    $_SESSION['username'] = $user['username'];			// Set username key to username from database 
		$_SESSION['UID']   = $user['UID'];			// Set custID key to custID from database 
	}



	
	function require_login($logged_in)						// Check if user logged in				
	{
	    if ($logged_in == false) {							// If not logged in						
	        header('Location: login.php');					// Send to login page 			
	        exit;    										// Stop rest of page running								
	    }
	}


	
	function logout() 										// Terminate the session 
	{
	    $_SESSION = [];										// Clear contents of array
	    $params = session_get_cookie_params();				// Get session cookie parameters

															// Delete session cookie
	    setcookie('PHPSESSID', '', time() - 3600, $params['path'], $params['domain'],
	        $params['secure'], $params['httponly']);	

	    session_destroy();									// Delete session file							
	}

	

	/* TO-DO: Create a function called authenticate() that:
          1. Accepts $pdo, username, and password as parameters
          2. Queries the customer table to find a row matching the provided username and password
          3. Executes the SQL query using the pdo() helper function and fetches the result
          4. Returns the matching user row if found
	*/
	function authenticate(PDO $pdo, string $username, string $password) {
		$sql = "SELECT * 
				FROM user
				WHERE username = :username;";
		
		// prepare statements to get user
		$user = pdo($pdo, $sql, ['username' => $username])->fetch();

		// if user exist and password passed in is vertify to be the same as the hashed password
		if($user && password_verify($password, $user["password"])) {
			return $user;
		}

		return false;
	}

// End of session.php – do NOT add any whitespace, new lines, or closing tag after this line