import React from "react";
import { Routes, Route } from "react-router-dom";
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

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/category/:categoryName" element={<CategoryView />} />
        <Route path="/note/:noteId" element={<NoteView />} />
        <Route path="/search/:noteID" element={<SearchView />} />
        <Route path="/my-library" element={<MyLibrary />} />
        <Route path="/edit-note/:noteId" element={<EditNote />} />
        <Route path="/note/:noteId/chapter/:chapterId" element={<ChapterView />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default RoutesComponent;