<?php
include "db_config.php";

$sql = "SELECT n.note_id, n.title, n.description, n.cover_image, n.category, n.created_at, u.username, u.profile_image
        FROM note n
        JOIN user u ON n.user_id = u.user_id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $notesByCategory = [];
    
    while ($row = $result->fetch_assoc()) {
        $category = $row['category'];
        // Group notes by category
        $notesByCategory[$category][] = $row;
    }
    
    echo json_encode(["success" => true, "data" => $notesByCategory]);
} else {
    echo json_encode(["success" => false, "message" => "No notes found."]);
}

$conn->close();
?>
