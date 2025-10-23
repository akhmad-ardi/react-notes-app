import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArchiveNotesPage from "./pages/ArchiveNotesPage";
import DetailNotePage from "./pages/DetailNotePage";
import AddNotePage from "./pages/AddNotePage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes/archive" element={<ArchiveNotesPage />} />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="/notes/:id" element={<DetailNotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
