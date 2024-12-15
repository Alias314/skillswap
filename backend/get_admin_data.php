<?php
header("Content-Type: application/json");
include "db_config.php";

try {
    // Fetch users
    $user_query = "SELECT user_id, username, email, status FROM user";
    $user_result = $conn->query($user_query);
    $users = $user_result->fetch_all(MYSQLI_ASSOC);

    // Fetch notes with author username
    $note_query = "
        SELECT 
            note.note_id, 
            note.title, 
            note.status, 
            user.username AS author_username
        FROM 
            note
        LEFT JOIN 
            user ON note.user_id = user.user_id
    ";
    $note_result = $conn->query($note_query);
    $notes = $note_result->fetch_all(MYSQLI_ASSOC);

    // Return data as JSON
    echo json_encode([
        "error" => false,
        "users" => $users,
        "notes" => $notes
    ]);
} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => "An error occurred while fetching data: " . $e->getMessage()
    ]);
} finally {
    $conn->close();
}
?>
