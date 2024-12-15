<?php
header("Content-Type: application/json");

include "db_config.php";
// Get user_id from the request
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

if (!$user_id) {
    echo json_encode(["error" => true, "message" => "User ID is required."]);
    exit;
}

// Fetch the user's role
$sql = "SELECT role FROM user WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["error" => false, "role" => $user['role']]);
} else {
    echo json_encode(["error" => true, "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>
