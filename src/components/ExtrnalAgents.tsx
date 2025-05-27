import { useState } from "react";
import { useNavigate } from "react-router-dom";

const agentOptions = [
  {
    key: "visha-vastra",
    label: "VISHA YUKTA VASTRADHARANA [synthetic or poisoned clothes]",
    symptoms: [
      "Kandu - Itching",
      "Artih - Pain",
      "Kotha - Wheal like skin eruptions",
      "Pidaka - Papule / eruptions",
      "Romodgamah - Horripilation / ascent of hairs",
      "Cimicimayanam - Tingling sensation",
      "Shotha - Oedema",
    ],
  },
  {
    key: "savisha-mukhalepa",
    label: "SAVISHA MUKHALEPA [harmful/ poisoned face cream application]",
    symptoms: [
      "Mukham syava / mukhasyavata - Blackishness of face",
      "Padminikantakaprakhyaih kantakaih upaciyate / padmakantakah - Thorny projections that appear like lotus",
      "Kandu - Itching",
      "Ruja - Pain",
      "Kotha - Wheal like skin eruptions",
      "Pidaka - Papule / eruptions",
      "Romodgamah - Horripilation / ascent of hairs",
      "Cimicimayanam - Tingling sensation",
      "Shotha - Oedema",
      "Sphotajanma/sphota - Blisters",
      "Srava - Discharge",
      "Twakpaka/paka - Suppuration of skin",
      "Swedanam/sweda - Perspiration",
      "Jwara - Fever",
      "Mamsadaranam - Cracks fissuring of mamsa",
      "Tvagdaha - Burning sensation in skin",
      "Avadaranam - Cracks fissuring of skin",
    ],
  },
  {
    key: "savisha-varnaka",
    label: "SAVISHA VARNAKA [application of harmful cream]",
    symptoms: [
      "Kandu - Itching",
      "Artih - Pain",
      "Kotha - Wheal like skin eruptions",
      "Pidaka - Papule / eruptions",
      "Romodgamah - Horripilation / ascent of hairs",
      "Cimicimayanam - Tingling sensation",
      "Shotha – Oedema",
    ],
  },
  {
    key: "savisha-anjana",
    label: "SAVISHA ANJANA [allergic or poisonous eyes application]",
    symptoms: [
      "Akshi daha - Burning of eyes",
      "Akshi srava - Discharge from eyes",
      "Ati upadeha - Stickiness",
      "Shotha - Oedema",
      "Raga - Redness",
      "Ashru - Lacrimation",
      "Daha - Burning sensation",
      "Vedana - Pain",
      "Drusti vibhrama - Impaired vision",
      "Andhata - Blindness",
    ],
  },
  {
    key: "savisha-paduka",
    label: "SAVISHA VISHAJUTA PADUKADHARANA [poisonous footwear]",
    symptoms: [
      "Shopha - Oedema",
      "Srava - Discharge",
      "Pada svapa - Numbness in feet",
      "Sphotajanmah - Blisters",
    ],
  },
  {
    key: "vishajuta-abhushana",
    label: "VISHAJUTA ABHUSHANA [ornamental poison]",
    symptoms: [
      "Daha - Burning sensation",
      "Paka - Inflammation or suppuration",
      "Avadaranam - Cracks fissuring of skin",
      "Kandu - Itching",
      "Artih - Pain",
      "Kotha - Wheal like skin eruptions",
      "Pidaka - Papule / eruptions",
      "Romodgamah - Horripilation / ascent of hairs",
      "Cimicimayanam - Tingling sensation",
      "Shotha - Oedema",
    ],
  },
  {
    key: "mukhagata-visha",
    label: "MUKHAGATA VISHA [oral applicants causing harmful effect]",
    symptoms: [
      "Osthacimicimayanam - Tingling sensation in lips",
      "Suna jihva - Swelling of the tongue",
      "Jada jihva / jihvajadyam - Numbness of the tongue",
      "Vivarna jihva - Discoloration of the tongue",
      "Dvijaharsah - Tenderness or intolerance to be touched in teeth",
      "Hanustambhah - Stiffness of jaw",
      "Asyadaha/ antarvaktradaha - Burning sensation in the mouth",
      "Lala - Salivation",
      "Galavikara - Diseases of throat",
      "Jihvamulagaurava - Heaviness/ numbness at the base of tongue",
      "Dantaharsah - Tenderness or intolerance to be touched in teeth/ dental hyperasthesia",
      "Osha - Burning sensation with sweating and restlessness",
      "Vaktracimacimayanam - Tingling sensation in mouth/ face",
      "Rasajnatvam - Inability to perceive taste",
    ],
  },
  {
    key: "savisha-dantanakha",
    label:
      "SAVISHA DANTANAKHAKASTHA [nail and teeth applicants causing toxic effect]",
    symptoms: [
      "Kurcahkuchaka visiryate - Teeth brush gets destructed",
      "Dantamamsashophah / dantamamsasvayathu - Swelling of gums",
      "Osthamamsashophah / osthamamsasvayathu - Swelling of lips",
      "Jihvasvayathu - Swelling of tongue",
      "Suyate - Oedema",
      "Pacyate - Suppuration",
      "Raga - Redness or congestion",
      "Jwara - Fever",
      "Srava - Discharge",
      "Ruja – Pain",
    ],
  },
  {
    key: "savisha-abhyanga",
    label:
      "SAVISHA ABHYANGA [any oil application on body causing harmful effect]",
    symptoms: [
      "Kandu - Itching",
      "Ruja - Pain",
      "Kotha - Wheal like skin eruptions",
      "Pidaka - Papule / eruptions",
      "Romodgamah - Horripilation / ascent of hairs",
      "Cimicimayanam - Tingling sensation",
      "Shotha - Oedema",
      "Sphota - Blisters",
      "Srava - Discharge",
      "Twakpaka - Suppuration of skin",
      "Sweda - Perspiration",
      "Jwara - Fever",
      "Mamsadaranam - Cracks fissuring of mamsa",
      "Tvagdaha - Burning sensation in skin",
      "Avadaranam - Cracks fissuring of skin",
    ],
  },
  {
    key: "savisha-utsadana",
    label: "SAVISHA UTSADANA [any powder applications recently]",
    symptoms: [
      "Kandu - Itching",
      "Ruja - Pain",
      "Kotha - Wheal like skin eruptions",
      "Pidaka - Papule / eruptions",
      "Romodgamah - Horripilation / ascent of hairs",
      "Cimicimayanam - Tingling sensation",
      "Shotha - Oedema",
      "Sphota - Blisters",
      "Srava - Discharge",
      "Twakpaka - Suppuration of skin",
      "Sweda - Perspiration",
      "Jwara - Fever",
      "Mamsadaranam - Cracks fissuring of mamsa",
      "Tvagdaha - Burning sensation in skin",
      "Avadaranam - Cracks fissuring of skin",
    ],
  },
  {
    key: "savisha-shiroabhyanga",
    label:
      "SAVISHA SHIROABHYANGA [hair oil application recently causing toxic effect]",
    symptoms: [
      "Kesacyutih / kesasatah / kesacyavanam - Falling of hairs",
      "Shira ruja - Headache",
      "Uttamangesu granthijanma / granthi/ granthijanma - Appearance of nodular swelling on the scalp / supraclavicular parts",
      "Khebhyah rudhiragamah - Bleeding from the hair pores",
    ],
  },
  {
    key: "savisha-snana",
    label: "SAVISHA SNANA [contact with harmful / poisoned /polluted water]",
    symptoms: [
      "Kandu - Itching",
      "Artih - Pain",
      "Kotha - Wheal like skin eruptions",
      "Pidaka - Papule / eruptions",
      "Romodgamah - Horripilation / ascent of hairs",
      "Cimicimayanam - Tingling sensation",
      "Shotha - Oedema",
    ],
  },
];

type SymptomAnswer = {
  answer: 'yes' | 'no' | '';
  ratings: boolean[];
};

type AgentAnswers = {
  [agentKey: string]: {
    [symptom: string]: SymptomAnswer;
  };
};

export function ExtrnalAgents() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<typeof agentOptions[0] | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AgentAnswers>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleAgentCheckbox = (agentKey: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentKey)
        ? prev.filter((k) => k !== agentKey)
        : prev.length < 2
        ? [...prev, agentKey]
        : prev
    );
    setSelectedAgent(null);
    setSelectedSymptom(null);
  };

  // const handleAgentSelect = (agent: typeof agentOptions[0]) => {
  //   setSelectedAgent(agent);
  //   setSelectedSymptom(null);
  // };

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptom(symptom);
  };

  const handleAnswer = (symptom: string, value: 'yes' | 'no') => {
    if (!selectedAgent) return;

    setAnswers((prev) => ({
      ...prev,
      [selectedAgent.key]: {
        ...prev[selectedAgent.key],
        [symptom]: {
          answer: value,
          ratings: value === 'yes' ? [false, false, false] : [],
        },
      },
    }));

    // Clear error when user makes a selection
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`${selectedAgent.key}-${symptom}`];
      return newErrors;
    });
  };

  const handleRating = (symptom: string, idx: number) => {
    if (!selectedAgent) return;

    setAnswers((prev) => {
      const currentRatings = prev[selectedAgent.key]?.[symptom]?.ratings || [false, false, false];
      const newRatings = [...currentRatings];
      newRatings[idx] = !newRatings[idx];
      return {
        ...prev,
        [selectedAgent.key]: {
          ...prev[selectedAgent.key],
          [symptom]: {
            answer: 'yes',
            ratings: newRatings,
          },
        },
      };
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    Object.entries(answers).forEach(([agentKey, agentAnswers]) => {
      Object.entries(agentAnswers).forEach(([symptom, answer]) => {
        if (!answer.answer) {
          newErrors[`${agentKey}-${symptom}`] = 'Please answer Yes or No';
          isValid = false;
        } else if (answer.answer === 'yes' && !answer.ratings.some(r => r)) {
          newErrors[`${agentKey}-${symptom}`] = 'Please select at least one severity level';
          isValid = false;
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('externalAgents', JSON.stringify(answers));
      navigate('/conclusion');
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

        <section className="p-6 sm:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-indigo-200 dark:border-indigo-700 transition-colors duration-500">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 text-center">External Agents Assessment</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">Select an agent and its associated symptoms</p>

          <div className="mb-6">
            <span className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">DUE TO CONTACT WITH</span>
            <div className="space-y-2">
              {agentOptions.map((agent) => (
                <label key={agent.key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAgents.includes(agent.key)}
                    onChange={() => handleAgentCheckbox(agent.key)}
                    disabled={
                      !selectedAgents.includes(agent.key) && selectedAgents.length >= 2
                    }
                    className="accent-indigo-600 h-5 w-5"
                  />
                  <span className="font-medium text-base text-gray-900 dark:text-gray-100">{agent.label}</span>
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 text-xs rounded bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                    onClick={() => setSelectedAgent(agent)}
                  >
                    Choose Symptoms
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Symptoms Modal */}
          {selectedAgent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
                <button
                  className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/70 dark:bg-gray-800/70 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-indigo-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 text-2xl font-bold transition-all"
                  onClick={() => setSelectedAgent(null)}
                >
                  ×
                </button>
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4 text-center">{selectedAgent.label}</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {selectedAgent.symptoms.map((symptom) => (
                    <div key={symptom} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col gap-4">
                        <button
                          onClick={() => handleSymptomSelect(symptom)}
                          className={`text-left font-medium ${
                            selectedSymptom === symptom
                              ? 'text-indigo-600 dark:text-indigo-300'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {symptom}
                        </button>
                        {selectedSymptom === symptom && (
                          <>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`${selectedAgent.key}-${symptom}`}
                                  checked={answers[selectedAgent.key]?.[symptom]?.answer === 'yes'}
                                  onChange={() => handleAnswer(symptom, 'yes')}
                                  className="accent-indigo-600 h-4 w-4"
                                />
                                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">YES</span>
                              </label>
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`${selectedAgent.key}-${symptom}`}
                                  checked={answers[selectedAgent.key]?.[symptom]?.answer === 'no'}
                                  onChange={() => handleAnswer(symptom, 'no')}
                                  className="accent-gray-400 h-4 w-4"
                                />
                                <span className="text-gray-600 dark:text-gray-300 font-semibold">NO</span>
                              </label>
                            </div>
                            {answers[selectedAgent.key]?.[symptom]?.answer === 'yes' && (
                              <div className="flex gap-4">
                                {[0, 1, 2].map((idx) => (
                                  <label key={idx} className="flex flex-col items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={!!answers[selectedAgent.key]?.[symptom]?.ratings?.[idx]}
                                      onChange={() => handleRating(symptom, idx)}
                                      className="accent-yellow-400 h-6 w-6"
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-200 mt-1">Level {idx + 1}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                            {errors[`${selectedAgent.key}-${symptom}`] && (
                              <p className="text-red-500 text-sm">{errors[`${selectedAgent.key}-${symptom}`]}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Summary of selected agents */}
          <div className="mt-8 mb-4">
            <span className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Selected Agents:</span>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-100">
              {selectedAgents.length === 0 && <li>None selected</li>}
              {selectedAgents.map((key) => {
                const agent = agentOptions.find((a) => a.key === key);
                return agent ? <li key={key}>{agent.label}</li> : null;
              })}
            </ul>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
            >
              Submit & Continue
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
