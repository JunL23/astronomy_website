<?php 
header('Access-Control-Allow-Origin: https://junrongliu.rhody.dev');
header('Access-Control-Allow-Methods: GET, POST');

$object = $_GET['id'] ?? "empty";
$temp = urlencode($object);


$skyview_url = "https://skyview.gsfc.nasa.gov/current/cgi/runquery.pl?Position=" . $temp . "&survey=DSS&coordinates=J2000&projection=Tan&pixels=256&size=2&float=on&scaling=Log&resolver=SIMBAD-NED&lut=colortables%2Fb-w-linear.bin&gridlabels=1&CatalogIDs=on&return=JPEG";

$imagedata = file_get_contents($skyview_url);

// tell program that the received data are of jpeg format
header("Content-Type: image/jpeg");
echo $imagedata;