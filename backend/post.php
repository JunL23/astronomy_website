<?php

    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Credentials: true');

    // Include to use session variables
    require_once('database-connection.php');
    require_once('session.php');

    // when passing JSON, it always send a preflight request to ensure data can be sent
    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(204);
        exit;
    }   

    // get frontend user location and timezone
    $frontend_request = file_get_contents('php://input');
    $frontend_json = json_decode($frontend_request, TRUE);

    $UID = $_SESSION['UID'];
    $title = $frontend_json['title'];
    $content = $frontend_json['content'];
    $time = $frontend_json['time'];

    $sql = "INSERT INTO community
        (post_time, title, content, UID)
        VALUES (:post_time, :title, :content, :UID);";
    
    try {
        pdo($pdo, $sql, ['post_time' => $time, 'title' => $title, 'content' => $content, 'UID' => $UID]);
    } catch (Exception $e) {
        echo "Error happened in post" . $e->getMessage();
    }
    

    echo json_encode(["success" => TRUE]);

