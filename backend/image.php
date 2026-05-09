<?php

    header('Access-Control-Allow-Origin: https://junrongliu.rhody.dev');
    header('Access-Control-Allow-Methods: GET, POST');

    // Include to use session variables
    require_once('database-connection.php');
    require_once('session.php');

    $id = $_GET['id'];
    $image_type = $_GET['type'];

    $URL = '/home1/junrongliu/astronomy/gallery_images/';

    $sql = "SELECT thumbnail, image, type FROM gallery WHERE ImageID = :imageid;";

    $stmt = pdo($pdo, $sql, ['imageid' => $id]);

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    if($image_type == 'thumbnail') {
        $URL .= 'Thumbnail/';
        $URL .= $data['thumbnail'];
    } else {
        $URL .= 'Full/';
        $URL .= $data['image'];
    }

    if($data['type'] == 'png') {
        header('Content-Type: image/png');
    }
    else {
        header('Content-Type: image/jpeg');
    }

    readfile($URL);
    exit;

