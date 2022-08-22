import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import Home from './components/Home';
import About from "./components/About"
import NoteState from './context/notes/noteState';
import { Alert } from './components/Alert';
import Login from './components/Login';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Hi alert " />
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route exact path="/about" element={<About />}>
            </Route>
            <Route exact path="/login" element={<Login />}>
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
