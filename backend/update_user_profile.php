<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include "db_config.php";

// Get the user ID from POST request
$user_id = $_POST['user_id'] ?? null;
$username = $_POST['username'] ?? null;
$profile_image = $_FILES['profile_image'] ?? null;

if (!$user_id || !$username) {
    echo json_encode(["success" => false, "message" => "User ID and username are required."]);
    http_response_code(400);
    exit();
}

// Handle profile image upload
$image_path = null;
if ($profile_image) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($profile_image["name"]);
    if (move_uploaded_file($profile_image["tmp_name"], $target_file)) {
        $image_path = $target_file; // Save image path
    } else {
        echo json_encode(["success" => false, "message" => "Error uploading image."]);
        http_response_code(500);
        exit();
    }
}

// Update the user in the database
$sql = "UPDATE `user` SET username = ?, profile_image = ? WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $username, $image_path, $user_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    // Fetch updated user data
    $sql = "SELECT user_id, username, email, profile_image, created_at FROM `user` WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    echo json_encode(["success" => true, "data" => $data]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating profile."]);
    http_response_code(500);
}

$stmt->close();
$conn->close();
?>
