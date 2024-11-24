<?php
header("Content-Type: application/json");
include 'db_config.php';

try {
    $query = "SELECT note_id, title, description, cover_image, category FROM note ORDER BY FIELD(category, 
        'All', 'Science', 'Math', 'Programming', 'Biology', 'Chemistry', 'Physics', 'Literature', 
        'History', 'Geography', 'Economics', 'Psychology', 'Philosophy', 'Engineering', 
        'Data Science', 'Medicine', 'Law', 'Architecture', 'Algorithms', 'Web Development', 
        'Mobile Development', 'Artificial Intelligence', 'Cybersecurity', 'English', 'Spanish', 
        'French', 'Chinese', 'Art and Design', 'Music Theory', 'Cooking', 'Photography', 
        'Writing', 'Business', 'Finance', 'Project Management', 'Public Speaking', 'Nutrition', 
        'Exercise Science', 'Mental Health')";

    $result = $conn->query($query);

    if (!$result) {
        throw new Exception("Error executing query: " . $conn->error);
    }

    // Grouping notes by category
    $notes = [];
    while ($row = $result->fetch_assoc()) {
        $notes[$row['category']][] = $row;
    }

    echo json_encode(["success" => true, "data" => $notes]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error fetching notes: " . $e->getMessage()]);
}
?>
