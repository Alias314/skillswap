<?php
session_start();
header('Content-Type: application/json');
include 'db_config.php';

// Read raw POST data
$requestPayload = file_get_contents("php://input");
$data = json_decode($requestPayload, true);

// Get email and password from JSON data
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
    exit();
}

// Prepare query
$query = "SELECT * FROM user WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    exit();
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    exit();
}

// Set session variables
$_SESSION['user'] = [
    'id' => $user['id'],
    'name' => $user['name'],
    'email' => $user['email'],
    'profile_image' => $user['profile_image'] ?? null
];

// $_SESSION['test'] = 'test_value';
// echo json_encode(['success' => true, 'message' => 'Login successful.']);

// Test session assignment
if (empty($_SESSION['user'])) {
    error_log("Session assignment failed."); // Log to server error log
}

// Return success response
ob_clean();
echo json_encode(['success' => true, 'message' => 'Login successful.']);
// var_dump($_SESSION);
$stmt->close();
$conn->close();
