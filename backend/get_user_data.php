<?php
include "db_config.php"; 

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "User ID is required."]);
    http_response_code(400);
    exit();
}

// Query to fetch user data
$sql = "SELECT user_id, username, email, profile_image, created_at
        FROM `user`
        WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    echo json_encode(["success" => true, "data" => $data]);
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
    http_response_code(404);
}

$stmt->close();
$conn->close();
?>
