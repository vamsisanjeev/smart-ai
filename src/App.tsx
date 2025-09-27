import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { TripPlanner } from './pages/TripPlanner';
import { BudgetEstimator } from './pages/BudgetEstimator';
import { GroupTracking } from './pages/GroupTracking';
import { Shop } from './pages/Shop';
import { SafetyPage } from './pages/Safety';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            <Route path="/budget-estimator" element={<BudgetEstimator />} />
            <Route path="/group-tracking" element={<GroupTracking />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;