import { useState } from 'react'
import {
    RouterProvider,
    createBrowserRouter,
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Groups from './pages/Groups';
import Subjects from './pages/Subjects';
import Login from './pages/Login';
import hvlLogo from './assets/hvl_logo.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navbar />}/>
          <Route index element={<Home />}/>
          <Route path="Stats" element={<Stats />}/>
          <Route path="Groups" element={<Groups />}/>
          <Route path="Login" element={<Login />}/>
          <Route path="Subjects" element={<Subjects />}/>
      </Routes>
    </div>
  )
}

export default App
