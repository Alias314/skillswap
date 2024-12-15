<?php
include "db_config.php";
// Get the POST data (JSON payload)
$data = json_decode(file_get_contents("php://input"));

// Check if the data is valid
if (isset($data->chapter_id) && isset($data->title)) {
    $chapterId = $data->chapter_id;
    $newTitle = trim($data->title); // Trim any excess whitespace

    // Prepare the SQL statement to update the chapter title
    $sql = "UPDATE chapter SET title = ? WHERE chapter_id = ?";
    
    // Prepare the query
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param('si', $newTitle, $chapterId);

        // Execute the query
        if ($stmt->execute()) {
            // Check if the title was updated successfully
            if ($stmt->affected_rows > 0) {
                // Successfully updated
                echo json_encode(['success' => true, 'message' => 'Chapter title updated successfully']);
            } else {
                // No rows updated (possibly chapter ID doesn't exist)
                echo json_encode(['success' => false, 'message' => 'Failed to update title or chapter not found']);
            }
        } else {
            // If the query failed to execute
            echo json_encode(['success' => false, 'message' => 'Error executing query']);
        }

        // Close the statement
        $stmt->close();
    } else {
        // If the prepared statement failed
        echo json_encode(['success' => false, 'message' => 'Failed to prepare the query']);
    }

    // Close the connection
    $conn->close();
} else {
    // Invalid request data
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
}
?>
