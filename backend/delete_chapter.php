<?php
header("Content-Type: application/json");
include "db_config.php"; // Ensure this file establishes your DB connection

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
$chapter_id = $data['chapter_id'] ?? ''; // Retrieve chapter_id from the request

// Validate input
if (empty($chapter_id)) {
    echo json_encode(["success" => false, "message" => "Chapter ID is required."]);
    exit;
}

// Prepare and execute delete query
$sql = "DELETE FROM chapter WHERE chapter_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $chapter_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Chapter deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete chapter."]);
}

$stmt->close();
$conn->close();
?>
