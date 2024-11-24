<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

include 'db_config.php';
header('Content-Type: application/json');

// Get the note_id from the URL
if (isset($_GET['note_id'])) {
    $note_id = $_GET['note_id'];

    // Fetch the note details
    $note_sql = "SELECT n.note_id, n.title, n.description, n.cover_image, u.username AS author
                 FROM note n
                 LEFT JOIN user u ON n.user_id = u.user_id
                 WHERE n.note_id = ?";
    $stmt = $conn->prepare($note_sql);
    $stmt->bind_param("i", $note_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $note = $result->fetch_assoc();

        // Fetch the chapters for this note
        $chapter_sql = "SELECT chapter_id, title FROM chapter WHERE note_id = ? ORDER BY chapter_order";
        $stmt = $conn->prepare($chapter_sql);
        $stmt->bind_param("i", $note_id);
        $stmt->execute();
        $chapter_result = $stmt->get_result();

        $chapters = [];
        while ($chapter = $chapter_result->fetch_assoc()) {
            $chapters[] = $chapter;
        }

        // Return the note and chapters data as JSON
        echo json_encode([
            'note' => $note,
            'chapters' => $chapters
        ]);
    } else {
        echo json_encode(['error' => 'Note not found']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Note ID not provided']);
}

$conn->close();
