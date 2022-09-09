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
import MintDAO from './pages/MintDAO';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/organization' element={<Organization />} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/loan" element={<Loan />} />
        <Route path='/mintdao' element={<MintDAO/>} />
      </Routes>     
    </BrowserRouter>
   );
}

export default App;

