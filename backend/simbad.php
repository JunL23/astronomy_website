<?php 
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST');

// use urlencode to ensure space of the object name is not causing error
$object = $_GET['id'] ?? "empty";
$temp = urldecode($object);
$temp = mb_convert_case($temp, MB_CASE_TITLE, "UTF-8");

// tap query, it is similar to SQL
// $tap = "SELECT
//         b.RA,
//         b.DEC,
//         b.main_id AS \"Main_identifier\",
//         i2.id AS \"Common_name\"
//         FROM basic as b
//         JOIN ident as i1
//         ON i1.oidref = b.oid
//         LEFT JOIN ident i2
//         ON i2.oidref = b.oid AND i2.id like '%' || normID('$temp') || '%'
//         WHERE i1.id = '$object';";

$tap = "SELECT TOP 1
        b.RA,
        b.DEC,
        b.main_id AS \"Main_identifier\",
        i2.id AS \"Common_name\",
        i1.id AS \"Ident\",
        b.morph_type
        FROM basic as b
        JOIN ident as i1
        ON i1.oidref = b.oid
        LEFT JOIN ident i2
        ON i2.oidref = b.oid AND i2.id like 'NAME %'
        WHERE i1.id = '$object';";

// array for the data fields for the POST request
$data = [
    'REQUEST' => 'doQuery',
    'PHASE' => 'RUN',
    'FORMAT' => 'json',
    'LANG' => 'ADQL',
    'query' => "$tap"
];

// URL to post this query to
$URL = "https://simbad.cds.unistra.fr/simbad/sim-tap/sync";

// initialize cURL session
$session = curl_init();

// set URL
curl_setopt($session, CURLOPT_URL, $URL);
// make HTTP POST reques
curl_setopt($session, CURLOPT_POST, true);
// return result into a variable and not print onto terminal or website
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
// send the proper data to the POST request
curl_setopt($session, CURLOPT_POSTFIELDS, $data);

$response = curl_exec($session);

// if the query failed
if($response === false) {
    echo json_encode([
        'Success' => false,
        'Error_message' => "Query to the SIMBAD database went wrong. Error: " . curl_error($session)
    ]);

    exit;
}

// decode the received data and close the cURL session
$json_response = json_decode($response, true);
curl_close($session);

$common = $json_response['data'][0][3];
$common = str_replace("NAME ", "", $common);

if((strlen($common) < strlen($temp) && str_contains($json_response['data'][0][4], "NAME ")) || $common == "") {
    $common = $temp;
}

// processed the data to include the data needed and associate them with the right name
$processed_response = [
    'Success' => true,
    'RA' => $json_response['data'][0][0],
    'DEC' => $json_response['data'][0][1],
    'Main_name' => str_replace("NAME ", "", $json_response['data'][0][2]),
    'Common_name' => $common,
    'type' => $json_response['data'][0][5]
];

// return the array as in JSON format
echo json_encode($processed_response);