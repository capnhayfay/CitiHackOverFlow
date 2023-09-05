import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Carousel } from "./components/Carousel"
import {Dashboard} from "./view/Dashboard"

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/Carousel' element={<Carousel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
