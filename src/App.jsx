import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';  // Correct import path
import Explore from './components/ExploreNotes';  // Correct import path

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/explore" element={<Explore />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;