<?php
header('Content-Type: application/json');
include 'db_config.php';

// Input validation
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$category = $_POST['category'] ?? '';
$user_id = 1; // For example, replace this with actual user id (from session or authentication)

if (empty($title) || empty($description) || empty($category)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// File upload handling
$coverImagePath = null;
if (isset($_FILES['coverImage']) && $_FILES['coverImage']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/'; // Directory to save images
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $fileName = basename($_FILES['coverImage']['name']);
    $fileTmpPath = $_FILES['coverImage']['tmp_name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!in_array($fileExtension, $allowedExtensions)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type. Allowed types: jpg, jpeg, png, gif.']);
        exit;
    }

    $newFileName = uniqid('note_', true) . '.' . $fileExtension;
    $coverImagePath = $uploadDir . $newFileName;

    if (!move_uploaded_file($fileTmpPath, $coverImagePath)) {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
        exit;
    }
}

// Prepare SQL statement
$query = $conn->prepare("INSERT INTO note (user_id, title, description, category, cover_image) VALUES (?, ?, ?, ?, ?)");

// Bind parameters
$query->bind_param('issss', $user_id, $title, $description, $category, $coverImagePath);

// Execute the query
if ($query->execute()) {
    echo json_encode(['success' => true, 'message' => 'Note created successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to create note.', 'error' => $query->error]);
}

// Close connection
$query->close();
$conn->close();
?>
