<?php
header('Content-Type: application/json');

// Database connection
include 'db_config.php';

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$noteId = isset($data['noteId']) ? intval($data['noteId']) : 0;
$chapters = $data['chapters'] ?? [];

if ($noteId === 0 || empty($chapters)) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Begin transaction
$conn->begin_transaction();

try {
    // Loop through each chapter
    foreach ($chapters as $chapter) {
        $chapterId = $chapter['chapter_id'] ?? null;
        $chapterTitle = $chapter['title'];

        // Debug: Check chapter data
        error_log("Processing chapter: $chapterTitle");

        // Insert or update chapter
        if ($chapterId) {
            // Update existing chapter
            $stmt = $conn->prepare("UPDATE chapter SET title = ? WHERE chapter_id = ?");
            $stmt->bind_param('si', $chapterTitle, $chapterId);
            $stmt->execute();
        } else {
            // Insert new chapter
            $stmt = $conn->prepare("INSERT INTO chapter (note_id, title) VALUES (?, ?)");
            $stmt->bind_param('is', $noteId, $chapterTitle);
            $stmt->execute();
            $chapterId = $conn->insert_id; // Get the new chapter ID

            // Debug: Check new chapter ID
            error_log("Inserted new chapter with ID: $chapterId");
        }

        // Handle components in the chapter
        foreach ($chapter['components'] as $component) {
            $componentId = $component['component_id'] ?? null;
            $componentTitle = $component['title'];
            $componentContent = $component['content'];

            // Debug: Check component data
            error_log("Processing component: $componentTitle");

            if ($componentId) {
                // Update existing component
                $stmt = $conn->prepare("UPDATE component SET title = ?, content = ? WHERE component_id = ?");
                $stmt->bind_param('ssi', $componentTitle, $componentContent, $componentId);
                $stmt->execute();
            } else {
                // Insert new component
                $stmt = $conn->prepare("INSERT INTO component (chapter_id, title, content) VALUES (?, ?, ?)");
                $stmt->bind_param('iss', $chapterId, $componentTitle, $componentContent);
                $stmt->execute();
            }
        }
    }

    // Commit transaction
    $conn->commit();
    echo json_encode(['success' => true, 'message' => 'Note saved successfully']);

} catch (Exception $e) {
    // Rollback transaction on error
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Failed to save note']);
}

$conn->close();