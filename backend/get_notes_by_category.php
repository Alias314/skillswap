<?php
include 'db_config.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get category from query parameter
$category = isset($_GET['category']) ? $_GET['category'] : '';

// Check if category is provided
if (empty($category)) {
    echo json_encode(["success" => false, "message" => "Category is required."]);
    exit;
}

// Prepare the SQL query to fetch notes by category
$sql = "SELECT note_id, title, cover_image, description FROM note WHERE category = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $category);
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Check if there are notes for the given category
if ($result->num_rows > 0) {
    $notes = [];
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }
    echo json_encode(["success" => true, "notes" => $notes]);
} else {
    echo json_encode(["success" => false, "message" => "No notes found for this category."]);
}

// Close connection
$stmt->close();
$conn->close();
?>