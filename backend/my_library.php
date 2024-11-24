<?php
header('Content-Type: application/json');
include 'db_config.php'; // Ensure this includes your database connection setup

$type = $_GET['type'] ?? '';

if (!$type) {
    echo json_encode(['error' => 'Note type is required.']);
    exit;
}

$sql = '';
if ($type === 'bookmarks') {
    $sql = "SELECT n.note_id, n.title, n.description, n.cover_image, u.username AS author
            FROM bookmark b
            JOIN note n ON b.note_id = n.note_id
            JOIN user u ON n.user_id = u.user_id";
} elseif ($type === 'userNotes') {
    $sql = "SELECT n.note_id, n.title, n.description, n.cover_image, u.username AS author
            FROM note n
            JOIN user u ON n.user_id = u.user_id
            WHERE n.user_id = ?"; // Use the logged-in user's ID
} else {
    echo json_encode(['error' => 'Invalid note type.']);
    exit;
}

$stmt = $conn->prepare($sql);

// For userNotes, bind the logged-in user's ID (replace with your user session ID)
if ($type === 'userNotes') {
    $userId = 1; // Replace this with the logged-in user's ID
    $stmt->bind_param('i', $userId);
}

$stmt->execute();
$result = $stmt->get_result();
$notes = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($notes);
?>
