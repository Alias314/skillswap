<?php
header('Content-Type: application/json');

// Check if the file is uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
    
    // Define allowed file types
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    // Check if the file type is valid
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type']);
        exit;
    }

    // Define upload directory
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Generate unique file name
    $fileName = uniqid() . '-' . basename($file['name']);
    $filePath = $uploadDir . $fileName;

    // Move the file to the upload directory
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        // Return the image URL
        echo json_encode(['success' => true, 'imageUrl' => $filePath]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No image file uploaded']);
}
?>
