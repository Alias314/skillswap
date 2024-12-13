<?php
// check_bookmark.php
include "db_config.php";
$user_id = $_GET['user_id'];
$note_id = $_GET['note_id'];

$query = "SELECT * FROM bookmark WHERE user_id = ? AND note_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $note_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['bookmarked' => true]);
} else {
    echo json_encode(['bookmarked' => false]);
}
