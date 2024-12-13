import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import CategoryView from "../pages/CategoryView";
import NoteView from "../pages/NoteView";
import EditNote from "../pages/EditNote";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MyLibrary from "../pages/MyLibrary";
import ChapterView from "../pages/ChapterView";
import SearchView from "../pages/SearchView";

const isAuthenticated = () => {
  // Replace this logic with your actual authentication check, e.g., token existence
  return !!localStorage.getItem("authToken");
};

const RoutesComponent = () => {
  return (
    <Routes>
      {/* Redirect to login if not authenticated */}
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/homepage" replace /> : <Login />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Routes that include header and footer */}
      <Route path="/" element={<MainLayout />}>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/category/:categoryName" element={<CategoryView />} />
        <Route path="/note/:noteId" element={<NoteView />} />
        <Route path="/search/:noteID" element={<SearchView />} />
        <Route path="/my-library" element={<MyLibrary />} />
        <Route path="/edit-note/:noteId" element={<EditNote />} />
        <Route
          path="/note/:noteId/chapter/:chapterId"
          element={<ChapterView />}
        />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;