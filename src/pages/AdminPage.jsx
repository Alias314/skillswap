import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users"); // Default tab is 'users'
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [statusFilter, setStatusFilter] = useState(""); // Status filter: '' | 'active' | 'banned'

  // Fetch data on mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          "http://localhost/skillswap/backend/get_admin_data.php"
        );
        const data = await response.json();

        if (!data.error) {
          setUsers(data.users);
          setNotes(data.notes);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  // Update status (ban/unban)
  const updateStatus = async (type, id, action) => {
    try {
      const response = await fetch(
        "http://localhost/skillswap/backend/update_status.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type, id, action }),
        }
      );

      const data = await response.json();

      if (!data.error) {
        if (type === "user") {
          setUsers((prev) =>
            prev.map((user) =>
              user.user_id === id
                ? { ...user, status: action === "ban" ? "banned" : "active" }
                : user
            )
          );
        } else if (type === "note") {
          setNotes((prev) =>
            prev.map((note) =>
              note.note_id === id
                ? { ...note, status: action === "ban" ? "banned" : "active" }
                : note
            )
          );
        }
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Filter data based on search term and status
  const filteredUsers = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || user.status === statusFilter)
  );

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || note.status === statusFilter)
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="mb-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setActiveTab("users");
            setSearchTerm(""); // Clear search term when switching tabs
            setStatusFilter(""); // Clear status filter
          }}
        >
          Users
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "notes" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setActiveTab("notes");
            setSearchTerm(""); // Clear search term when switching tabs
            setStatusFilter(""); // Clear status filter
          }}
        >
          Notes
        </button>
      </div>

      {/* Search Bar and Status Filter */}
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${activeTab === "users" ? "users" : "notes"}...`}
          className="px-4 py-2 border rounded w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === "users" && (
        <>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <table className="w-full table-auto mb-8">
            <thead>
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.user_id}>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">
                    {user.status === "active" ? (
                      <button
                        onClick={() =>
                          updateStatus("user", user.user_id, "ban")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Ban
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          updateStatus("user", user.user_id, "unban")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Unban
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "notes" && (
        <>
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map((note) => (
                <tr key={note.note_id}>
                  <td className="border px-4 py-2">{note.title}</td>
                  <td className="border px-4 py-2">{note.author_username}</td>
                  <td className="border px-4 py-2">{note.status}</td>
                  <td className="border px-4 py-2">
                    {note.status === "active" ? (
                      <button
                        onClick={() =>
                          updateStatus("note", note.note_id, "ban")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Ban
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          updateStatus("note", note.note_id, "unban")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Unban
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminPage;
