import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Make sure to import this
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
import WatchLater from "./pages/WatchLater";
import EditVideo from "./pages/EditVideo";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes so it's always visible */}
      <Navbar />

      {/* Add padding here to create space under the fixed Navbar */}
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route path="/edit-video/:id" element={
            <ProtectedRoute>
              <EditVideo />
            </ProtectedRoute>
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/liked-videos" element={
              <ProtectedRoute>
                <LikedVideos />
              </ProtectedRoute>
            }
          />
          <Route path="/watch-later" element={
              <ProtectedRoute>
                <WatchLater />
              </ProtectedRoute>
              }
          />
          <Route path="/watch-later" element={
              <ProtectedRoute>
                <WatchLater />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-uploads"
            element={
              <ProtectedRoute>
                <MyUploads />
              </ProtectedRoute>
            }
          />
          
          <Route path="/watch/:id" element={<Watch />} />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;