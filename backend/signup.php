<?php
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST');

    require_once('database-connection.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST") {         // Check if the form was submitted
        $username = $_POST['username'];                  // Get the username the user sent
        $password = $_POST['password'];                 // Get the password the user sent


        $password_hashed = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO user
                (username, password)
                VALUES (:username, :password);";
        
        try {
            pdo($pdo, $sql, ['username' => $username, 'password' => $password_hashed]);
            echo "Success sign up";
        } catch (Exception $e) {
            echo "Error happened in sign up" . $e->getMessage();
        }
    }



