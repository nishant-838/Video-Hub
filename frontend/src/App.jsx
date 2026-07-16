import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Watch from "./pages/Watch";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchResults from "./pages/SearchResults";
import MyUploads from "./pages/MyUploads";
import History from "./pages/History";
import LikedVideos from "./pages/LikedVideos";
import WatchLater from "./pages/watchLater";
import EditVideo from "./pages/EditVideo";
import Analytics from "./pages/Analytics";

function AppContent() {
  const location = useLocation();
  
  // Define paths where the Navbar should be hidden
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      
      {/* Conditionally apply top padding to avoid awkward spacing on login/register */}
      <div className={!hideNavbar ? "pt-24" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/upload" element={
            <ProtectedRoute><Upload /></ProtectedRoute>
          } />
          
          <Route path="/edit-video/:id" element={
            <ProtectedRoute><EditVideo /></ProtectedRoute>
          } />
          
          <Route path="/search" element={<SearchResults />} />

          <Route path="/analytics" element={
            <ProtectedRoute><Analytics /></ProtectedRoute>
          } />

          <Route path="/liked-videos" element={
            <ProtectedRoute><LikedVideos /></ProtectedRoute>
          } />
          
          <Route path="/watch-later" element={
            <ProtectedRoute><WatchLater /></ProtectedRoute>
          } />
          
          <Route path="/my-uploads" element={
            <ProtectedRoute><MyUploads /></ProtectedRoute>
          } />
          
          <Route path="/watch/:id" element={<Watch />} />
          
          <Route path="/history" element={
            <ProtectedRoute><History /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;