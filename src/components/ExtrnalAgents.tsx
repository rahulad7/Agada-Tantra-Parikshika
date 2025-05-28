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
    label: "SAVISHA DANTANAKHAKASTHA [nail and teeth applicants causing toxic effect]",
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
    label: "SAVISHA ABHYANGA [any oil application on body causing harmful effect]",
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
    label: "SAVISHA SHIROABHYANGA [hair oil application recently causing toxic effect]",
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
  const [answers, setAnswers] = useState<AgentAnswers>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const [durationOfContact, setDurationOfContact] = useState('');
  const [siteOfContact, setSiteOfContact] = useState('');

  const handleAgentCheckbox = (agentKey: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentKey)
        ? prev.filter((k) => k !== agentKey)
        : prev.length < 2
        ? [...prev, agentKey]
        : prev
    );
  };

  const handleAnswer = (agentKey: string, symptom: string, value: 'yes' | 'no') => {
    setAnswers((prev) => ({
      ...prev,
      [agentKey]: {
        ...prev[agentKey],
        [symptom]: {
          answer: value,
          ratings: value === 'yes' ? [false, false, false] : [],
        },
      },
    }));

    // Clear error when user makes a selection
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`${agentKey}-${symptom}`];
      return newErrors;
    });
  };

  const handleRating = (agentKey: string, symptom: string, idx: number) => {
    setAnswers((prev) => {
      const currentRatings = prev[agentKey]?.[symptom]?.ratings || [false, false, false];
      const newRatings = [...currentRatings];
      newRatings[idx] = !newRatings[idx];
      return {
        ...prev,
        [agentKey]: {
          ...prev[agentKey],
          [symptom]: {
            answer: 'yes',
            ratings: newRatings,
          },
        },
      };
    });
  };

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (selectedAgents.length === 0) {
      newErrors.selectedAgents = 'Please select at least one agent.';
    }
    if (!durationOfContact.trim()) {
      newErrors.durationOfContact = 'Duration of Contact is required.';
    }
    if (!siteOfContact.trim()) {
      newErrors.siteOfContact = 'Site of Contact is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Gather external agents data
      const externalAgentsData = {
        selectedAgents,
        answers,
        durationOfContact,
        siteOfContact,
      };

      // Retrieve data from previous pages from localStorage
      const personalData = JSON.parse(localStorage.getItem('personalDetails') || '{}');
      const additionalData = JSON.parse(localStorage.getItem('additionalDetails') || '{}');
      const damashaData = JSON.parse(localStorage.getItem('damashaDetails') || '{}');

      // Combine all data into allFormData
      const allFormData = {
        personal: personalData,
        additional: additionalData,
        damasha: Object.keys(damashaData).length > 0 ? damashaData : {},
        externalAgents: externalAgentsData,
      };

      // Save combined data to localStorage
      localStorage.setItem('allFormData', JSON.stringify(allFormData));

      // Navigate to External Agent Conclusion page
      navigate('/external-agent-conclusion');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-indigo-100 to-emerald-100 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-500 px-2 py-8 sm:py-16">
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

          {/* I. DUE TO CONTACT WITH section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">I. DUE TO CONTACT WITH</h2>
            <div className="space-y-6">
              {agentOptions.map((agent) => (
                <div key={agent.key} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={selectedAgents.includes(agent.key)}
                      onChange={() => handleAgentCheckbox(agent.key)}
                      disabled={!selectedAgents.includes(agent.key) && selectedAgents.length >= 2}
                      className="accent-indigo-600 h-5 w-5"
                    />
                    <span className="font-medium text-base text-gray-900 dark:text-gray-100">{agent.label}</span>
                  </label>

                  {/* Show symptoms if agent is selected */}
                  {selectedAgents.includes(agent.key) && (
                    <div className="ml-8 space-y-4 border-l-2 border-indigo-200 dark:border-indigo-700 pl-4">
                      {agent.symptoms.map((symptom) => {
                        const currentState = answers[agent.key]?.[symptom];
                        return (
                          <div key={symptom} className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-4 border border-indigo-100 dark:border-gray-700">
                            <p className="text-gray-900 dark:text-gray-100 font-medium mb-3">{symptom}</p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-700 dark:text-gray-300 text-sm">Present?</span>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className={`px-3 py-1 rounded-l-md border transition ${
                                    currentState?.answer === 'yes'
                                      ? 'bg-green-500 text-white border-green-600'
                                      : 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                                  } hover:opacity-90`}
                                  onClick={() => handleAnswer(agent.key, symptom, 'yes')}
                                >
                                  YES
                                </button>
                                <button
                                  type="button"
                                  className={`px-3 py-1 rounded-r-md border transition ${
                                    currentState?.answer === 'no'
                                      ? 'bg-red-500 text-white border-red-600'
                                      : 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                                  } hover:opacity-90`}
                                  onClick={() => handleAnswer(agent.key, symptom, 'no')}
                                >
                                  NO
                                </button>
                              </div>
                            </div>

                            {currentState?.answer === 'yes' && (
                              <div className="mt-4">
                                <span className="text-gray-700 dark:text-gray-300 text-sm">Grade Level:</span>
                                <div className="flex items-center gap-4 mt-2">
                                  <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="1"
                                    value={currentState.ratings.findIndex(r => r) + 1 || 1}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      const newRatings = [false, false, false];
                                      newRatings[value - 1] = true;
                                      handleRating(agent.key, symptom, value - 1);
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                                  />
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[1.5rem] text-center">
                                    {currentState.ratings.findIndex(r => r) + 1 || 1}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {errors.selectedAgents && <p className="mt-2 text-xs text-red-500">{errors.selectedAgents}</p>}
          </div>

          {/* II. DURATION OF CONTACT section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">II. DURATION OF CONTACT</h2>
            <input
              type="text"
              value={durationOfContact}
              onChange={(e) => setDurationOfContact(e.target.value)}
              placeholder="Enter duration of contact"
              className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
            />
            {errors.durationOfContact && <p className="mt-2 text-xs text-red-500">{errors.durationOfContact}</p>}
          </div>

          {/* III. SITE OF CONTACT section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">III. SITE OF CONTACT</h2>
            <input
              type="text"
              value={siteOfContact}
              onChange={(e) => setSiteOfContact(e.target.value)}
              placeholder="Enter site of contact"
              className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
            />
            {errors.siteOfContact && <p className="mt-2 text-xs text-red-500">{errors.siteOfContact}</p>}
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
