<?php
    // Script to allow frontend to interact with this PHP file
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods:GET, POST');
    header('Access-Control-Allow-Credentials: true');

    // include the session.php file to enable logged in status checking
    require_once('session.php');

    if($logged_in) {
        echo "Logged in";
    }
    else {
        echo "Not logged in";
    }