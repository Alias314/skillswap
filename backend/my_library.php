<?php
header('Content-Type: application/json');
include 'db_config.php'; // Ensure this includes your database connection setup

// Retrieve the 'type' and 'user_id' from query parameters
$type = $_GET['type'] ?? '';
$user_id = $_GET['user_id'] ?? null;

if (!$type || !$user_id) {
    echo json_encode(['error' => 'Note type and user_id are required.']);
    exit;
}

$sql = '';
if ($type === 'bookmarks') {
    $sql = "SELECT n.note_id, n.title, n.description, n.cover_image, n.status, u.username AS author, u.profile_image
            FROM bookmark b
            JOIN note n ON b.note_id = n.note_id
            JOIN user u ON n.user_id = u.user_id
            WHERE b.user_id = ? AND n.status != 'banned'";
} elseif ($type === 'userNotes') {
    $sql = "SELECT n.note_id, n.title, n.description, n.cover_image, n.status, u.username AS author, u.profile_image
            FROM note n
            JOIN user u ON n.user_id = u.user_id
            WHERE n.user_id = ? AND n.status != 'banned'";
} else {
    echo json_encode(['error' => 'Invalid note type.']);
    exit;
}


$stmt = $conn->prepare($sql);

// Bind the user_id to the prepared statement
$stmt->bind_param('i', $user_id);

$stmt->execute();
$result = $stmt->get_result();
$notes = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($notes);

// Close the database connection
$stmt->close();
$conn->close();
