import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // Retrieve user_id from localStorage
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    // Fetch user data from the backend API using the user_id
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost/skillswap/backend/get_user_data.php?user_id=${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setUser(data.data); // Assuming response contains user data under 'data'
          setNewUsername(data.data.username); // Initialize new username
        } else {
          setError(data.message || "Error fetching user data");
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setError("User not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("username", newUsername);
    if (newProfileImage) {
      formData.append("profile_image", newProfileImage);
    }

    try {
      const response = await fetch(
        "http://localhost/skillswap/backend/update_user_profile.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data.data);
        setError(null);
        alert("Profile updated successfully!");
      } else {
        setError(data.message || "Error updating profile");
      }
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

      <div className="flex items-center space-x-6 mb-6">
        {/* Profile Image */}
        <img
          src={
            imagePreview ||
            "backend/" + user.profile_image ||
            "/default-profile.png"
          } // Show preview or existing image
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
        />
        <div>
          <p className="text-xl font-semibold">{user.username}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">
            Joined: {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Update Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            New Username
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Change Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
