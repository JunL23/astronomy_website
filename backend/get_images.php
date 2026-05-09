<?php

header('Access-Control-Allow-Origin: https://junrongliu.rhody.dev');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Include to use session variables
require_once('database-connection.php');
require_once('session.php');

$images = [];

// Fetch all images from the gallery table
$sql = "SELECT ImageID FROM gallery";

try {
    $stmt = $pdo->query($sql); // Execute the query
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows as an associative array

    echo json_encode(["success" => true, "images" => $images]); // Return the images in the response
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}