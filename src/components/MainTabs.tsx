import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tabList = [
  'ANY FOOD AND ACTIVITY CONSUMED CAUSING TOXIC EFFECT',
  'DAMSHA / BITE',
  'CONTACTS WITH SOME EXTERNAL AGENTS',
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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-white dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-2 py-8 sm:py-16 transition-colors duration-500">
      <div className="w-full max-w-6xl p-8 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-500">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center transition-colors duration-500">Choose any one from Tab</h1>
        <div className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-gray-700 mb-6 sm:mb-8 gap-8 sm:gap-6">
          {tabList.map((tab, idx) => (
            <button
              key={tab}
              className={`flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm border transition-all duration-200
                ${activeTab === idx
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-400 text-white border-indigo-500 shadow-lg scale-105 dark:from-indigo-700 dark:to-blue-900'
                  : 'bg-indigo-50 text-indigo-700 border-transparent hover:bg-blue-100 hover:text-indigo-900 hover:shadow-md dark:bg-gray-800 dark:text-indigo-200 dark:hover:bg-gray-700 dark:hover:text-white'}
              `}
              onClick={() => handleTabClick(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 min-h-[80px] sm:min-h-[120px]">
          <div
            className={`transition-all duration-300 ease-in-out ${tabAnim || 'opacity-100 translate-y-0'}`}
            key={activeTab}
          >
            <div className="text-center text-gray-700 dark:text-gray-100 text-sm sm:text-base px-2 sm:px-8 py-4 transition-colors duration-500">
              {tabList[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 