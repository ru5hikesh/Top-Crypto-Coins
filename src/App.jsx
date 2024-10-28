import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Coins from './Components/Coins';
import Navbar from './Components/Navbar';
import News from './Components/News';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/home" element={<Coins />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
