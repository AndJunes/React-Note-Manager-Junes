import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { NoteFormPage } from "./pages/NotesFormPage";
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";
import { NoteProvider } from "./context/notesContext";


function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/add-note" element={<NoteFormPage />} />
                <Route path="/notes/:id" element={<NoteFormPage />} />

              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;