import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const garaQuestions = [
  { key: '1', text: 'Have you consumed suspicious or unknown food, medicine, or herbal mixture recently?' },
  { key: '2', text: 'Did symptoms begin suddenly after consuming food or medicine?' },
  { key: '3', text: 'Do you experience burning sensation or heat in your body?' },
  { key: '4', text: 'Is there an unpleasant or foul odor from your body, breath, or sweat?' },
  { key: '5', text: 'Are your symptoms associated with dizziness, confusion, or faintness?' },
  { key: '6', text: 'Do you feel heaviness in the head or body post meals?' },
  { key: '7', text: 'Do your symptoms appear with specific food combinations or timing?' },
  { key: '8', text: 'Are you exposed to chemical-based cosmetics, perfumes, or cleaning agents regularly?' },
  { key: '9', text: 'Do you suffer from indigestion, bloating, or nausea after meals?' },
  { key: '10', text: 'Do you notice any discoloration in skin or eyes post exposure to substances?' },
];

const dushiQuestions = [
  { key: 'D1', text: 'Have you had exposure to untreated insect bites, chemicals, or environmental toxins in the past?' },
  { key: 'D2', text: 'Do you experience frequent allergic reactions or sensitivities?' },
  { key: 'D3', text: 'Are your symptoms worse during specific seasons (e.g., monsoon or cold)?' },
  { key: 'D4', text: 'Do you have a history of consuming incompatible foods regularly (e.g., fish + milk, curd + fruits)?' },
  { key: 'D5', text: 'Do you suffer from long-term skin issues (itching, eruptions, dry patches)?' },
  { key: 'D6', text: 'Are you often mentally dull, fatigued, or depressed without clear reason?' },
  { key: 'D7', text: 'Have conventional treatments failed to completely resolve your symptoms?' },
  { key: 'D8', text: 'Do symptoms reappear after physical/emotional stress or heavy meals?' },
  { key: 'D9', text: 'Is there a history of chronic low-grade fever, sinus, or swelling in your case?' },
  { key: 'D10', text: 'Do you feel like your body reacts negatively to many medications or treatments?' },
];

export function FoodActivity() {
  const [answers, setAnswers] = useState<{ [key: string]: 'yes' | 'no' | '' }>({});
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [dushiAnswers, setDushiAnswers] = useState<{ [key: string]: 'yes' | 'no' | '' }>({});
  const [dushiRatings, setDushiRatings] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (key: string, value: 'yes' | 'no') => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (value === 'yes' && !ratings[key]) {
      setRatings((prev) => ({ ...prev, [key]: 1 }));
    }
    if (value === 'no') {
      setRatings((prev) => {
        const newRatings = { ...prev };
        delete newRatings[key];
        return newRatings;
      });
    }
    // Clear error when question is answered
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const handleRating = (qKey: string, value: number) => {
    setRatings((prev) => ({ ...prev, [qKey]: value }));
  };

  const handleDushiChange = (key: string, value: 'yes' | 'no') => {
    setDushiAnswers((prev) => ({ ...prev, [key]: value }));
    if (value === 'yes' && !dushiRatings[key]) {
      setDushiRatings((prev) => ({ ...prev, [key]: 1 }));
    }
    if (value === 'no') {
      setDushiRatings((prev) => {
        const newRatings = { ...prev };
        delete newRatings[key];
        return newRatings;
      });
    }
    // Clear error when question is answered
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const handleDushiRating = (qKey: string, value: number) => {
    setDushiRatings((prev) => ({ ...prev, [qKey]: value }));
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    let hasErrors = false;

    // Check Gara questions
    garaQuestions.forEach(q => {
      if (!answers[q.key]) {
        newErrors[q.key] = 'Please answer this question';
        hasErrors = true;
      } else if (answers[q.key] === 'yes' && !ratings[q.key]) {
        newErrors[q.key] = 'Please set a grade level';
        hasErrors = true;
      }
    });

    // Check Dushi questions
    dushiQuestions.forEach(q => {
      if (!dushiAnswers[q.key]) {
        newErrors[q.key] = 'Please answer this question';
        hasErrors = true;
      } else if (dushiAnswers[q.key] === 'yes' && !dushiRatings[q.key]) {
        newErrors[q.key] = 'Please set a grade level';
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      navigate('/conclusion', { 
        state: { 
          answers, 
          ratings, 
          dushiAnswers, 
          dushiRatings 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-500 px-2 py-8 sm:py-16">
      <div className="w-full max-w-3xl space-y-12">
        <button
          type="button"
          onClick={() => navigate('/main-tabs')}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-indigo-700 dark:text-indigo-300 rounded-lg shadow border border-indigo-200 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-700 transition font-semibold text-base"
        >
          <span className="text-xl">←</span> Back
        </button>
        {/* Gara Visha Section */}
        <section className="p-6 sm:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-indigo-200 dark:border-indigo-700 transition-colors duration-500">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 text-center">Gara Visha Questionnaire</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">(Synthetic, compound, or artificially prepared poison; usually from food, medicine, or chemicals)</p>
          <form className="space-y-8">
            {garaQuestions.map((q) => (
              <div key={q.key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-medium text-gray-900 dark:text-gray-100 flex-1">G{q.key}. {q.text}</span>
                  <div className="flex gap-4 mt-2 sm:mt-0">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={q.key}
                        checked={answers[q.key] === 'yes'}
                        onChange={() => handleChange(q.key, 'yes')}
                        className="accent-indigo-600 h-4 w-4"
                      />
                      <span className="text-indigo-600 dark:text-indigo-300 font-semibold">YES</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={q.key}
                        checked={answers[q.key] === 'no'}
                        onChange={() => handleChange(q.key, 'no')}
                        className="accent-gray-400 h-4 w-4"
                      />
                      <span className="text-gray-600 dark:text-gray-300 font-semibold">NO</span>
                    </label>
                  </div>
                </div>
                {errors[q.key] && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors[q.key]}</p>
                )}
                {answers[q.key] === 'yes' && (
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 ml-2">
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={1}
                      value={ratings[q.key] || 1}
                      onChange={e => handleRating(q.key, Number(e.target.value))}
                      className="w-40 accent-yellow-400"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-semibold">Grade: {ratings[q.key] || 1}</span>
                  </div>
                )}
              </div>
            ))}
          </form>
        </section>
        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="h-1 w-24 bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-400 rounded-full opacity-60"></span>
        </div>
        {/* Dushi Visha Section */}
        <section className="p-6 sm:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-yellow-200 dark:border-yellow-700 transition-colors duration-500">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-2 text-center">Dushi Visha Questionnaire</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">(Low-potency poison retained in the body for long; effects are chronic and hidden)</p>
          <form className="space-y-8">
            {dushiQuestions.map((q) => (
              <div key={q.key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-medium text-gray-900 dark:text-gray-100 flex-1">{q.key}. {q.text}</span>
                  <div className="flex gap-4 mt-2 sm:mt-0">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={q.key}
                        checked={dushiAnswers[q.key] === 'yes'}
                        onChange={() => handleDushiChange(q.key, 'yes')}
                        className="accent-indigo-600 h-4 w-4"
                      />
                      <span className="text-indigo-600 dark:text-indigo-300 font-semibold">YES</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={q.key}
                        checked={dushiAnswers[q.key] === 'no'}
                        onChange={() => handleDushiChange(q.key, 'no')}
                        className="accent-gray-400 h-4 w-4"
                      />
                      <span className="text-gray-600 dark:text-gray-300 font-semibold">NO</span>
                    </label>
                  </div>
                </div>
                {errors[q.key] && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-2">{errors[q.key]}</p>
                )}
                {dushiAnswers[q.key] === 'yes' && (
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 ml-2">
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={1}
                      value={dushiRatings[q.key] || 1}
                      onChange={e => handleDushiRating(q.key, Number(e.target.value))}
                      className="w-40 accent-yellow-400"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-semibold">Grade: {dushiRatings[q.key] || 1}</span>
                  </div>
                )}
              </div>
            ))}
          </form>
        </section>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-semibold text-lg"
        >
          Submit and Continue
        </button>
      </div>
    </div>
  );
} 