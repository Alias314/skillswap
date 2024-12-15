<?php
header("Content-Type: application/json");
include "db_config.php";

// Read raw JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Validate input
if (!isset($data['type'], $data['id'], $data['action'])) {
    echo json_encode(["error" => true, "message" => "Invalid request data."]);
    exit;
}

$type = $data['type']; // 'user' or 'note'
$id = intval($data['id']); // ID of the user or note
$action = $data['action']; // 'ban' or 'unban'

// Determine the table and status
$table = $type === 'user' ? 'user' : 'note';
$new_status = $action === 'ban' ? 'banned' : 'active';

// Update the status
$sql = "UPDATE $table SET status = ? WHERE {$type}_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => true, "message" => "Failed to prepare statement."]);
    exit;
}

$stmt->bind_param("si", $new_status, $id);

if ($stmt->execute()) {
    echo json_encode(["error" => false, "message" => ucfirst($type) . " status updated successfully."]);
} else {
    echo json_encode(["error" => true, "message" => "Failed to update status."]);
}

$stmt->close();
$conn->close();
?>
