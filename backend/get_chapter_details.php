<?php
header('Content-Type: application/json');

// Include database connection file
include 'db_config.php';

// Check if chapter_id is provided in the GET request
if (isset($_GET['chapter_id'])) {
    // Sanitize and validate the chapter_id input
    $chapter_id = filter_var($_GET['chapter_id'], FILTER_VALIDATE_INT);

    if ($chapter_id === false || $chapter_id <= 0) {
        // Invalid chapter_id, return an error
        echo json_encode([
            'error' => true,
            'message' => 'Invalid chapter ID provided.'
        ]);
        exit;
    }

    // Prepare and execute the SQL query securely to fetch chapter details
    $stmt = $conn->prepare("SELECT * FROM chapter WHERE chapter_id = ?");
    if ($stmt === false) {
        echo json_encode([
            'error' => true,
            'message' => 'Failed to prepare the chapter query.'
        ]);
        exit;
    }

    $stmt->bind_param("i", $chapter_id);
    $stmt->execute();
    $chapterResult = $stmt->get_result();

    // Check if the chapter exists
    if ($chapterResult->num_rows > 0) {
        $chapter = $chapterResult->fetch_assoc();

        // Fetch related components for the chapter
        $componentStmt = $conn->prepare("SELECT * FROM component WHERE chapter_id = ?");
        if ($componentStmt === false) {
            echo json_encode([
                'error' => true,
                'message' => 'Failed to prepare the component query.'
            ]);
            exit;
        }

        $componentStmt->bind_param("i", $chapter_id);
        $componentStmt->execute();
        $componentResult = $componentStmt->get_result();

        $components = [];
        while ($component = $componentResult->fetch_assoc()) {
            $components[] = $component;
        }

        // Close the component statement
        $componentStmt->close();

        // Return the chapter details and its components as JSON
        echo json_encode([
            'error' => false,
            'chapter' => $chapter,
            'components' => $components
        ]);
    } else {
        // Chapter not found
        echo json_encode([
            'error' => true,
            'message' => 'Chapter not found.'
        ]);
    }

    // Close the chapter statement
    $stmt->close();
} else {
    // Missing chapter_id parameter
    echo json_encode([
        'error' => true,
        'message' => 'Invalid request: chapter_id is required.'
    ]);
}

// Close the database connection
$conn->close();
?>
