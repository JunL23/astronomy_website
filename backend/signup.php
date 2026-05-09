<?php
    // Script to allow website to sign up users
    header('Access-Control-Allow-Origin: https://junrongliu.rhody.dev');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Credentials: true');

    require_once('database-connection.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {         // Check if the form was submitted
        $username = $_POST['username'];                  // Get the username the user sent
        $password = $_POST['password'];                 // Get the password the user sent


        // hash user password for security before putting into the database
        $password_hashed = password_hash($password, PASSWORD_DEFAULT);

        // SQL query to insert new user info into database, use prepared statement
        // prevents SQL injection
        $sql = "INSERT INTO user
                (username, password)
                VALUES (:username, :password);";
        
        // add user to database
        try {
            pdo($pdo, $sql, ['username' => $username, 'password' => $password_hashed]);
            echo "Success sign up";
        } catch (Exception $e) {
            echo "Error happened in sign up" . $e->getMessage();
        }
    }



