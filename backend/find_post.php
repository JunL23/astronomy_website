<?php

header('Access-Control-Allow-Origin: https://junrongliu.rhody.dev');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// when passing JSON, it always send a preflight request to ensure data can be sent
if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Include to use session variables
require_once('database-connection.php');

$frontend_request = file_get_contents('php://input');
$frontend_json = json_decode($frontend_request, TRUE);

$word = $frontend_json['search'];

// Fetch all post from the gallery table
$sql = "SELECT title, content FROM community WHERE title LIKE :search OR content LIKE :search1";

$search = "%$word%";

try {
    $stmt = pdo($pdo, $sql, ['search' => $search, 'search1' => $search]);
    $post = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "post" => $post]); // Return the post in the response
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}