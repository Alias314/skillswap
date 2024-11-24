<?php
include 'db_config.php';

$query = isset($_GET['query']) ? $_GET['query'] : '';
if ($query !== '') {
    $stmt = $conn->prepare("SELECT * FROM note WHERE title LIKE ? OR description LIKE ?");
    $searchQuery = "%" . $query . "%";
    $stmt->bind_param('ss', $searchQuery, $searchQuery);
    $stmt->execute();
    $result = $stmt->get_result();

    $notes = [];
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }

    echo json_encode(['success' => true, 'notes' => $notes]);
} else {
    echo json_encode(['success' => false, 'message' => 'No search query provided.']);
}
?>
