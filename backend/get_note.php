<?php
header('Content-Type: application/json');

// Database connection
include 'db_config.php';

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Get noteId from the request
$noteId = isset($_GET['noteId']) ? intval($_GET['noteId']) : 0;

if ($noteId === 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid note ID']);
    exit;
}

// Fetch chapters and components
$sql = "
    SELECT 
        chapter.chapter_id, 
        chapter.title AS chapter_title, 
        component.component_id, 
        component.title AS component_title, 
        component.content
    FROM chapter
    LEFT JOIN component ON chapter.chapter_id = component.chapter_id
    WHERE chapter.note_id = ?
";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare query: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $noteId);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    echo json_encode(['success' => false, 'message' => 'Query execution failed: ' . $conn->error]);
    exit;
}

$chapters = [];
while ($row = $result->fetch_assoc()) {
    $chapterId = $row['chapter_id'];
    if (!isset($chapters[$chapterId])) {
        $chapters[$chapterId] = [
            'chapter_id' => $chapterId,
            'title' => $row['chapter_title'],
            'components' => []
        ];
    }

    if ($row['component_id']) {
        $chapters[$chapterId]['components'][] = [
            'component_id' => $row['component_id'],
            'title' => $row['component_title'],
            'content' => $row['content']
        ];
    }
}

// Return chapters and components as JSON
echo json_encode(['success' => true, 'chapters' => array_values($chapters)]);

$conn->close();
