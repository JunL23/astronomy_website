<?php                                            

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// when passing JSON, it always send a preflight request to ensure data can be sent
if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}

$configs = parse_ini_file('.env');

// get frontend user location and timezone
$frontend_request = file_get_contents('php://input');
$frontend_json = json_decode($frontend_request, TRUE);

$lat = $frontend_json['lat'];
$long = $frontend_json['lon'];
$timezone = $frontend_json['timezone'];

$params = [
    'lat' => $lat,
    'lon' => $long,
    'appid' => $configs['WEATHER_API']
];

// base URL
$URL = "https://api.openweathermap.org/data/2.5/weather?lat=" . $lat . "&lon=" . $long . "&appid=" . $configs['WEATHER_API'];

$session = curl_init();

// set the api link to go to
curl_setopt($session, CURLOPT_URL, $URL);

// return result into a variable and not print onto terminal or website
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($session);

// if the query failed
if($response === false) {
    echo json_encode([
        'Success' => false,
        'Error_message' => "Query to weather API went wrong. Error: " . curl_error($session)
    ]);

    exit;
}

$json_response = json_decode($response, TRUE);
curl_close($session);

$user_timezone = new DateTimeZone($timezone);

// @ means UNIX timestamp
$sunrise = (new DateTime("@" . $json_response['sys']['sunrise']))->setTimezone($user_timezone)->format("H:i:s");
$sunset = (new DateTime("@" . $json_response['sys']['sunset']))->setTimezone($user_timezone)->format("H:i:s");

$result = [
    'Success' => TRUE,
    'Weather' => $json_response['weather'][0]['main'],
    'Icon' => $json_response['weather'][0]['icon'],
    'Sunrise' => $sunrise,
    'Sunset' => $sunset
];

echo json_encode($result);

