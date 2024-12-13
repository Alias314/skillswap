// CategoriesDropdown.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// List of categories
const categories = [
  "Architecture",
  "Science",
  "Technology",
  "Mathematics",
  "Arts and Humanities",
  "Social Sciences",
  "Health and Medicine",
  "Business and Finance",
  "Education",
  "Engineering",
  "Languages",
  "Computer Science",
  "Law and Governance",
  "Psychology",
  "Philosophy",
  "Lifestyle and Wellness",
];

function CategoriesDropdown() {
  const [categoriesVisible, setCategoriesVisible] = useState(false); // State to control visibility of the categories
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    // Navigate to the CategoryView page with the selected category
    navigate(`/category/${category}`);
    setCategoriesVisible(false); // Hide categories dropdown after selection
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setCategoriesVisible(true)} // Show categories on hover
      onMouseLeave={() => setCategoriesVisible(false)} // Hide categories when mouse leaves
    >
      <button className="text-black hover:text-blue-500">Categories</button>
      {categoriesVisible && (
        <div className="absolute left-0 bg-white border border-gray-300 shadow-lg rounded-md w-48 z-10">
          <ul className="py-2">
            {categories.map((category) => (
              <li
                key={category}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategorySelect(category)} // Navigate to CategoryView on click
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoriesDropdown;
