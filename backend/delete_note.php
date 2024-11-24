<?php
// Database connection settings
include 'db_config.php';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the note ID from the URL
$note_id = isset($_GET['note_id']) ? intval($_GET['note_id']) : 0;

if ($note_id > 0) {
    // Prepare SQL to delete the note from the database
    $sql = "DELETE FROM note WHERE note_id = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        // Bind the note_id to the SQL statement
        $stmt->bind_param("i", $note_id);
        
        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Note deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting note.']);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error preparing the query.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid note ID.']);
}

// Close the database connection
$conn->close();
?>
