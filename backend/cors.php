<?php
// header('Access-Control-Allow-Origin: http://localhost:5173');
// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow only this origin
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

?>