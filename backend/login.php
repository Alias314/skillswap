<?php
header("Content-Type: application/json");
include "db_config.php"; // Make sure this file establishes your DB connection

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Email and password are required."]);
    exit;
}

// Prepare and execute query
$sql = "SELECT user_id, email, password FROM user WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verify password
    if (password_verify($password, $user['password'])) {
        // Login successful
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user_id" => $user['user_id'] // Include user_id in the response
        ]);
    } else {
        // Password does not match
        echo json_encode(["success" => false, "message" => "Invalid credentials."]);
    }
} else {
    // User not found
    echo json_encode(["success" => false, "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>
