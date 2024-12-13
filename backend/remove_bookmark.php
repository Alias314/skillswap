<?php
include "db_config.php";
$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id;
$note_id = $data->note_id;

$query = "DELETE FROM bookmark WHERE user_id = ? AND note_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $note_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to remove bookmark']);
}

