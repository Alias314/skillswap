<?php
// save_chapter.php
header('Content-Type: application/json');
include 'db_config.php';  // Assuming you have a 'db_config.php' file for connection details

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$noteId = isset($data['noteId']) ? intval($data['noteId']) : 0;
$chapter = $data['chapter'] ?? null;

if ($noteId === 0 || !$chapter || empty($chapter['title'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$chapterId = isset($chapter['chapter_id']) ? $chapter['chapter_id'] : null;
$chapterTitle = $chapter['title'];

// Insert or update chapter logic
if ($chapterId) {
    // Update existing chapter
    $stmt = $conn->prepare("UPDATE chapter SET title = ? WHERE chapter_id = ?");
    $stmt->bind_param('si', $chapterTitle, $chapterId);
} else {
    // Insert new chapter
    $stmt = $conn->prepare("INSERT INTO chapter (note_id, title) VALUES (?, ?)");
    $stmt->bind_param('is', $noteId, $chapterTitle);
}

// Execute the query
if ($stmt->execute()) {
    if (!$chapterId) {
        // If it's a new chapter, retrieve the inserted chapter_id
        $chapterId = $stmt->insert_id;
    }
    // Send back the success response with chapter_id
    echo json_encode(['success' => true, 'chapter_id' => $chapterId]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save chapter']);
}

// Close the statement and connection
$stmt->close();
$conn->close();
