// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ReadNote from './components/ViewNote';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import CreateNote from './components/CreateNotes';
import MyLibrary from './components/MyLibrary';
import Profile from './components/Profile';
import ChapterView from './components/ChapterView';

function App() {
  return (
    <div className='h-screen w-screen overflow-x-hidden bg-[#F3F3F3]'>
      <Router>
        <Routes>
          {/* Main route renders MainLayout with Homepage as a child */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} /> {/* Default child route */}
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/note/:noteId" element={<ReadNote />} />
            <Route path="/note/:noteId/chapter/:chapterId" element={<ChapterView />} />
            <Route path="/create-note" element={<CreateNote />} />
            <Route path="/my-library" element={<MyLibrary />} />
          </Route>

          {/* Other routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
