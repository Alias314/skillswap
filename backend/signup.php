<?php
include 'db_config.php';

// Enable error reporting for debugging
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// Check if the connection was successful
if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Extract the values from the JSON data
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$username = $data['username'] ?? '';

// Validate input
if (empty($email) || empty($password) || empty($username)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit();
}

// Check if the email already exists
$query = "SELECT * FROM user WHERE email = ?";
$stmt = $conn->prepare($query);

// Check if prepare() succeeded
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare the query.']);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email is already taken.']);
    exit();
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert the user into the database
$query = "INSERT INTO user (email, username, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);

// Check if prepare() succeeded
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare the insert query.']);
    exit();
}

$stmt->bind_param("sss", $email, $username, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User successfully created.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error occurred. Please try again later.']);
}

$stmt->close();
$conn->close();
?>
