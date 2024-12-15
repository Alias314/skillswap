<?php
header("Content-Type: application/json");
include "db_config.php"; // Make sure this file establishes your DB connection

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
$component_id = $data['component_id'] ?? ''; // Retrieve component_id from the request

// Validate input
if (empty($component_id)) {
    echo json_encode(["success" => false, "message" => "Component ID is required."]);
    exit;
}

// Prepare and execute delete query
$sql = "DELETE FROM component WHERE component_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $component_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Component deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete component."]);
}

$stmt->close();
$conn->close();
?>
