import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Find from "./pages/Find";
import Match from "./pages/Match";
import Profile from "./pages/Profile";
import Book from "./pages/Book";
import Appointments from "./pages/Appointments";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import Emergency from "./pages/Emergency";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf7f2] text-slate-800">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/find" element={<Find />} />
          <Route path="/match" element={<Match />} />
          <Route path="/psychologist/:id" element={<Profile />} />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <Book />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
