// session.php
<?php
session_start();
header('Content-Type: application/json');
include 'db_config.php';
echo $_SESSION['user'];

if (isset($_SESSION['user'])) {
    echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
} else {
    echo json_encode(['success' => false, 'message' => 'No user is logged in.']);
}
?>