import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Organization from './pages/Organization';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className='absolute z-10'>
      <Navbar/>
    </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/organization" element={<Organization />} />
      </Routes>
    </BrowserRouter>
   );
}

export default App;
