import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface FormData {
  personal: any;
  additional: any;
  damasha: {
    selectedOrganism: string;
    subOptionState: {
      [key: string]: {
        [key: string]: {
          choice: 'yes' | 'no' | '';
          grade: number | null;
        };
      };
    };
    timeOfBite: string;
    siteOfBite: string;
  };
}

export function DamshaConclusion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('allFormData');
    console.log('Data retrieved for Damsha Conclusion from localStorage:', storedData);

    if (storedData) {
      try {
        setFormData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing localStorage data for Damsha Conclusion:', error);
        setFormData(null);
      }
    }
  }, []);

  // Calculate Damasha Grade
  const calculateDamashaGrade = () => {
    if (!formData?.damasha) return { percent: 0, severity: 'Mild' };

    let totalGrade = 0;
    let maxPossibleGrade = 0;

    Object.entries(formData.damasha.subOptionState).forEach(([_, subOptions]) => {
      Object.entries(subOptions).forEach(([_, state]) => {
        if (state.choice === 'yes') {
          totalGrade += state.grade || 0;
          maxPossibleGrade += 3; // Maximum grade per symptom is 3
        }
      });
    });

    const percent = maxPossibleGrade > 0 ? Math.round((totalGrade / maxPossibleGrade) * 100) : 0;
    let severity = 'Mild';
    if (percent > 80) severity = 'Severe Complicated';
    else if (percent > 60) severity = 'Alarming High Alert';
    else if (percent > 50) severity = 'Moderate';

    return { percent, severity };
  };

  const { percent: damashaGradePercent, severity: damashaSeverity } = calculateDamashaGrade();

  if (!formData) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-500 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">No Data Available</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Please ensure you have completed all previous steps.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-8 mt-8 gap-2">
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">Damasha Bite Report</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Go to Home
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Print
            </button>
          </div>
        </div>

        {/* Grade Summary Section */}
        <section className="bg-gradient-to-r from-indigo-100 via-yellow-100 to-emerald-100 dark:from-indigo-900 dark:via-yellow-900 dark:to-emerald-900 rounded-2xl shadow p-6 border-2 border-indigo-300 dark:border-indigo-700 flex flex-col items-center mb-6">
          <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-200 mb-2">Overall Toxicity Grade</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-3xl font-extrabold text-indigo-800 dark:text-yellow-200">{damashaGradePercent}%</span>
            <span className={`px-4 py-2 rounded-lg text-lg font-semibold ${
              damashaSeverity === 'Mild' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' :
              damashaSeverity === 'Moderate' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              damashaSeverity === 'Alarming High Alert' ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {damashaSeverity}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            {damashaSeverity === 'Mild' && '≤ 50%: Mild'}
            {damashaSeverity === 'Moderate' && '51–60%: Moderate'}
            {damashaSeverity === 'Alarming High Alert' && '61–80%: Alarming High Alert'}
            {damashaSeverity === 'Severe Complicated' && '81–100%: Severe Complicated'}
          </p>
        </section>

        {/* Personal Details Section */}
        {formData.personal && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-indigo-200 dark:border-indigo-700">
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.personal).map(([key, value]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{key}</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{String(value)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Details Section */}
        {formData.additional && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-yellow-200 dark:border-yellow-700">
            <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-6">Additional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.additional).map(([key, value]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{key}</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{String(value)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Damasha Bite Section */}
        {formData.damasha && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-emerald-200 dark:border-emerald-700">
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6">Damasha Bite Details</h2>
            <div className="space-y-6">
              {/* Selected Organism */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Selected Organism</h3>
                <p className="font-medium text-gray-900 dark:text-gray-100">{formData.damasha.selectedOrganism}</p>
              </div>

              {/* Sub-options/Symptoms */}
              {formData.damasha.subOptionState && formData.damasha.subOptionState[formData.damasha.selectedOrganism] && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Symptoms</h3>
                  <div className="space-y-3">
                    {Object.entries(formData.damasha.subOptionState[formData.damasha.selectedOrganism]).map(([symptom, state]) => (
                      <div key={symptom} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{symptom}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-semibold">Response:</span>
                          <span className={`text-sm font-medium ${state.choice === 'yes' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {state.choice.toUpperCase()}
                          </span>
                          {state.choice === 'yes' && state.grade !== null && (
                            <span className="text-sm text-yellow-600 dark:text-yellow-400 ml-2">
                              (Grade: {state.grade})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Time and Site of Bite */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time of Bite</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{formData.damasha.timeOfBite}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Site of Bite</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{formData.damasha.siteOfBite}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 