import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./contexts/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notebook from "./components/Notebook";



function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div >
            <Routes>
              <Route exact path="/inotes" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/" element={<Notebook />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
