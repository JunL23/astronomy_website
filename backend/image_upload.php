<?php

    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Credentials: true');

    // include to use session variables
    require_once('database-connection.php');
    require_once('session.php');

    // UID
    $UID = $_SESSION['UID'];

    // files since we are sending images
    // tmp_name is where php actually store the file
    $file = $_FILES['image']['tmp_name'];
    // get image dims
    list($width, $height) = getimagesize($file);

    $type = exif_imagetype($file);
    $image;
    // get image
    if(exif_imagetype($file) !== FALSE) {
        $image = imagecreatefromstring(file_get_contents($file));
    }
    else {
        return FALSE;
    }

    // new image width
    $new_width = 300;
    $new_height = 200;

    // some constants to be used
    $thumbnail_folder_path = '../Images/Thumbnail/';
    $full_image_folder = '../Images/Full/';
    $new_thumbnail_img_name = 'img_thumb_' . $UID . '_' . time();
    $new_full_img_name = 'img_full_' . $UID . '_' . time();
    
    $image_p = imagecreatetruecolor($new_width, $new_height);
    imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

    if($type == IMAGETYPE_JPEG) {
        $new_thumbnail_img_name .= '.jpg';
        $new_full_img_name .= '.jpg';
        imagejpeg($image_p, $thumbnail_folder_path . $new_thumbnail_img_name, 85);
        imagejpeg($image, $full_image_folder . $new_full_img_name, 85);
        $type = 'jpg';
    }
    else if($type == IMAGETYPE_PNG) {
        $new_thumbnail_img_name .= '.png';
        $new_full_img_name .= '.png';
        imagepng($image_p, $thumbnail_folder_path . $new_thumbnail_img_name);
        imagepng($image, $full_image_folder . $new_full_img_name);
        $type = 'png';
    }

    $sql = "INSERT INTO gallery
            (UID, thumbnail, type, image)
            VALUES (:UID, :thumbnail, :type, :image);";
    
    try {
        pdo($pdo, $sql, ['UID' => $UID, 'thumbnail' => $thumbnail_folder_path . $new_thumbnail_img_name, 
                        'type' => $type, 'image' => $full_image_folder . $new_full_img_name]);
    } catch (Exception $e) {
        echo "Error happened in sign up" . $e->getMessage();
    }
    

    echo json_encode(["success" => TRUE]);





