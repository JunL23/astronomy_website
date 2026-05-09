<?php

header('Access-Control-Allow-Origin: https://junrongliu.rhody.dev');
header('Access-Control-Allow-Methods: GET');

// Include to use session variables
require_once('database-connection.php');

// Fetch all post from the gallery table
$sql = "SELECT title, content FROM community";

try {
    $stmt = $pdo->query($sql); // Execute the query
    $post = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows as an associative array

    echo json_encode(["success" => true, "post" => $post]); // Return the post in the response
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}