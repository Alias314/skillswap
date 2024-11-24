<?php
// Include database connection
header('Content-Type: application/json');
include 'db_config.php'; // Ensure this file defines $conn

// Check for database connection errors
if ($conn->connect_error) {
    echo json_encode([
        "error" => true,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit();
}

// Query to fetch chapters ordered by `chapter_id`
$query = "SELECT chapter_id AS id, title FROM chapter ORDER BY chapter_id ASC";
$result = $conn->query($query);

// Check if the query execution is successful
if (!$result) {
    echo json_encode([
        "error" => true,
        "message" => "Error executing query: " . $conn->error
    ]);
    exit();
}

// Fetch the chapters into an array
$chapters = [];
while ($row = $result->fetch_assoc()) {
    $chapters[] = $row;
}

// Free result set and close connection
$result->free();
$conn->close();

// Return the chapters as JSON
echo json_encode([
    "chapters" => $chapters
]);
?>
