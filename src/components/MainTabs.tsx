import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeakerIcon, BugAntIcon, SparklesIcon } from '@heroicons/react/24/outline';

const tabList = [
  {
    label: 'ANY FOOD AND ACTIVITY CONSUMED CAUSING TOXIC EFFECT',
    icon: BeakerIcon,
  },
  {
    label: 'DAMSHA / BITE',
    icon: BugAntIcon,
  },
  {
    label: 'CONTACTS WITH SOME EXTERNAL AGENTS',
    icon: SparklesIcon,
  },
];

export function MainTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabAnim, setTabAnim] = useState('');
  const navigate = useNavigate();

  const handleTabClick = (idx: number) => {
    if (idx === 0) {
      navigate('/food-activity');
      return;
    }
    if (idx === 1) {
      navigate('/damsha-bite');
      return;
    }
    if (idx === 2) {
      navigate('/external-agents');
      return;
    }
    if (idx !== activeTab) {
      setTabAnim('opacity-0 translate-y-4');
      setTimeout(() => {
        setActiveTab(idx);
        setTabAnim('opacity-0 -translate-y-4');
        setTimeout(() => setTabAnim('opacity-100 translate-y-0'), 10);
      }, 200);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-indigo-100 to-emerald-100 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-2 py-8 sm:py-16 transition-colors duration-500">
      <div className="w-full max-w-4xl p-8 sm:p-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-200 dark:border-gray-800 transition-colors duration-500">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-8 text-center">Choose a Section</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
          {tabList.map((tab, idx) => (
            <button
              key={tab.label}
              className={`flex flex-col items-center flex-1 px-4 py-4 rounded-2xl border-2 transition-all duration-200 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600
                ${activeTab === idx
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-400 text-white border-indigo-500 scale-105 shadow-lg dark:from-indigo-700 dark:to-emerald-900'
                  : 'bg-white/70 dark:bg-gray-800/70 text-indigo-700 dark:text-indigo-200 border-transparent hover:bg-blue-100 hover:text-indigo-900 hover:shadow-lg dark:hover:bg-gray-700 dark:hover:text-white'}
              `}
              onClick={() => handleTabClick(idx)}
            >
              <tab.icon className="h-8 w-8 mb-2" />
              <span className="text-xs sm:text-base text-center leading-tight">{tab.label}</span>
              {activeTab === idx && (
                <span className="block mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 dark:from-indigo-300 dark:to-emerald-700 animate-pulse" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 min-h-[80px] sm:min-h-[120px]">
          <div
            className={`transition-all duration-300 ease-in-out ${tabAnim || 'opacity-100 translate-y-0'}`}
            key={activeTab}
          >
            <div className="text-center text-gray-700 dark:text-gray-100 text-base sm:text-lg px-2 sm:px-8 py-4 transition-colors duration-500">
              {tabList[activeTab].label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 