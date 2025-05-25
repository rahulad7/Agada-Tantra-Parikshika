import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PersonalDetailsForm } from './components/PersonalDetails'
import './App.css'

function SecondPage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900">Second Page</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalDetailsForm />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App
