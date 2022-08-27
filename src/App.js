import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Organization from './pages/Organization';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Individual from './pages/Individual';
import Loan from './pages/Loan';
import Footer from './components/Footer';
import Onboarding from './pages/Onboarding';

function App() {
  return (
    <BrowserRouter>
    <div className='absolute z-10'>
      <Navbar/>
    </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/loan" element={<Loan />} />
      </Routes>
      
    </BrowserRouter>
   );
}

export default App;

