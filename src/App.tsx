import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PersonalDetailsForm } from './components/PersonalDetails'
import { AdditionalDetails } from './components/AdditionalDetails'
import { MainTabs } from './components/MainTabs'
import { FoodActivity } from './components/FoodActivity'
import { ThemeProvider, useTheme } from './components/ThemeProvider'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { DamashaBite } from './components/DamashaBite'
import { ExtrnalAgents } from './components/ExtrnalAgents'
import { Conclusion } from './components/Conclusion'
import './App.css'

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" />
      )}
    </button>
  );
}

function AppRoutes() {
  return (
    <Router>
      <ThemeToggleButton />
      <Routes>
        <Route path="/" element={<PersonalDetailsForm />} />
        <Route path="/additional-details" element={<AdditionalDetails />} />
        <Route path="/main-tabs" element={<MainTabs />} />
        <Route path="/food-activity" element={<FoodActivity />} />
        <Route path="/damsha-bite" element={<DamashaBite />} />
        <Route path="/external-agents" element={<ExtrnalAgents />} />
        <Route path="/conclusion" element={<Conclusion />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App
