import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DecisionList from './components/DecisionList';
import DecisionDetail from './components/DecisionDetail';
import { DecisionProvider } from './context/DecisionContext';

function App() {
  return (
    <DecisionProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<DecisionList />} />
              <Route path="/decision/:id" element={<DecisionDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DecisionProvider>
  );
}

export default App;