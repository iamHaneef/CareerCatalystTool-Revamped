//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Resume from './pages/Resume';






function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </div>
  );
}

export default App;
