import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footsteps from './pages/Footsteps';
import Duaa from './pages/Duaa';
import PodcastPage from './pages/PodcastPage';
import SkillsGuid from './pages/SkillsGuid';
import Book from './pages/Book';
import SelectPage from './pages/SelectPage';
import Admin from './pages/Admin';
import VideoPage from './pages/VideoPage';
import Login from './pages/Login';
const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/podcast/:content" element={<PodcastPage />} />
      <Route path="/duaa" element={<Duaa />} />
      <Route path="/hajjsteps" element={<Footsteps />} />
      <Route path="/skillsguid" element={<SkillsGuid />} />
      <Route path="/book" element={<Book />} />
      <Route path="/selectpage" element={<SelectPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/video/:content" element={<VideoPage />} />

    </Routes>
  </Router>
);

export default AppRouter;
