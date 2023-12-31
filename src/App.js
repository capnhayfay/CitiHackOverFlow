import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Carousel } from "./components/Carousel"
import { Dashboard } from "./view/Dashboard"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/Carousel' element={<Carousel />} />
        </Routes>
    </div>
  );
}

export default App;
