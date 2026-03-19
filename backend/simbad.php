<?php 

// use urlencode to ensure space of the object name is not causing error
$object = urlencode($_GET['id'] ?? "empty");

// tap query, it is similar to SQL
$tap = "SELECT
        RA,
        DEC,
        main_id AS \"Main identifier\"
        FROM basic 
        JOIN ident 
        ON oidref = oid
        WHERE id = '$object';";

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

// processed the data to include the data needed and associate them with the right name
$processed_response = [
    'Success' => true,
    'RA' => $json_response['data'][0][0],
    'DEC' => $json_response['data'][0][1],
    'Main_name' => $json_response['data'][0][2]
];

// return the array as in JSON format
echo json_encode($processed_response);