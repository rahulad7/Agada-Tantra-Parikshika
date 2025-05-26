import { useState } from 'react';

const agentOptions = [
  {
    key: 'visha-vastra',
    label: 'VISHA YUKTA VASTRADHARANA [synthetic or poisoned clothes]',
    symptoms: [
      'Kandu - Itching',
      'Artih - Pain',
      'Kotha - Wheal like skin eruptions',
      'Pidaka - Papule / eruptions',
      'Romodgamah - Horripilation / ascent of hairs',
      'Cimicimayanam - Tingling sensation',
      'Shotha - Oedema',
    ],
  },
  {
    key: 'savisha-mukhalepa',
    label: 'SAVISHA MUKHALEPA [harmful/ poisoned face cream application]',
    symptoms: [
      'Mukham syava / mukhasyavata - Blackishness of face',
      'Padminikantakaprakhyaih kantakaih upaciyate / padmakantakah - Thorny projections that appear like lotus',
      'Kandu - Itching',
      'Ruja - Pain',
      'Kotha - Wheal like skin eruptions',
      'Pidaka - Papule / eruptions',
      'Romodgamah - Horripilation / ascent of hairs',
      'Cimicimayanam - Tingling sensation',
      'Shotha - Oedema',
      'Sphotajanma/sphota - Blisters',
      'Srava - Discharge',
      'Twakpaka/paka - Suppuration of skin',
      'Swedanam/sweda - Perspiration',
      'Jwara - Fever',
      'Mamsadaranam - Cracks fissuring of mamsa',
      'Tvagdaha - Burning sensation in skin',
      'Avadaranam - Cracks fissuring of skin',
    ],
  },
  {
    key: 'savisha-varnaka',
    label: 'SAVISHA VARNAKA [application of harmful cream]',
    symptoms: [
      'Kandu - Itching',
      'Artih - Pain',
      'Kotha - Wheal like skin eruptions',
      'Pidaka - Papule / eruptions',
      'Romodgamah - Horripilation / ascent of hairs',
      'Cimicimayanam - Tingling sensation',
      'Shotha – Oedema',
    ],
  },
  {
    key: 'savisha-anjana',
    label: 'SAVISHA ANJANA [allergic or poisonous eyes application]',
    symptoms: [
      'Akshi daha - Burning of eyes',
      'Akshi srava - Discharge from eyes',
      'Ati upadeha - Stickiness',
      'Shotha - Oedema',
      'Raga - Redness',
      'Ashru - Lacrimation',
      'Daha - Burning sensation',
      'Vedana - Pain',
      'Drusti vibhrama - Impaired vision',
      'Andhata - Blindness',
    ],
  },
  {
    key: 'savisha-paduka',
    label: 'SAVISHA VISHAJUTA PADUKADHARANA [poisonous footwear]',
    symptoms: [
      'Shopha - Oedema',
      'Srava - Discharge',
      'Pada svapa - Numbness in feet',
      'Sphotajanmah - Blisters',
    ],
  },
  {
    key: 'vishajuta-abhushana',
    label: 'VISHAJUTA ABHUSHANA [ornamental poison]',
    symptoms: [
      'Daha - Burning sensation',
      'Paka - Inflammation or suppuration',
      'Avadaranam - Cracks fissuring of skin',
      'Kandu - Itching',
      'Artih - Pain',
      'Kotha - Wheal like skin eruptions',
      'Pidaka - Papule / eruptions',
      'Romodgamah - Horripilation / ascent of hairs',
      'Cimicimayanam - Tingling sensation',
      'Shotha - Oedema',
    ],
  },
  {
    key: 'mukhagata-visha',
    label: 'MUKHAGATA VISHA [oral applicants causing harmful effect]',
    symptoms: [
      'Osthacimicimayanam - Tingling sensation in lips',
      'Suna jihva - Swelling of the tongue',
      'Jada jihva / jihvajadyam - Numbness of the tongue',
      'Vivarna jihva - Discoloration of the tongue',
      'Dvijaharsah - Tenderness or intolerance to be touched in teeth',
      'Hanustambhah - Stiffness of jaw',
      'Asyadaha/ antarvaktradaha - Burning sensation in the mouth',
      'Lala - Salivation',
      'Galavikara - Diseases of throat',
      'Jihvamulagaurava - Heaviness/ numbness at the base of tongue',
      'Dantaharsah - Tenderness or intolerance to be touched in teeth/ dental hyperasthesia',
      'Osha - Burning sensation with sweating and restlessness',
      'Vaktracimacimayanam - Tingling sensation in mouth/ face',
      'Rasajnatvam - Inability to perceive taste',
    ],
  },
  {
    key: 'savisha-dantanakha',
    label: 'SAVISHA DANTANAKHAKASTHA [nail and teeth applicants causing toxic effect]',
    symptoms: [
      'Kurcahkuchaka visiryate - Teeth brush gets destructed',
      'Dantamamsashophah / dantamamsasvayathu - Swelling of gums',
      'Osthamamsashophah / osthamamsasvayathu - Swelling of lips',
      'Jihvasvayathu - Swelling of tongue',
      'Suyate - Oedema',
      'Pacyate - Suppuration',
      'Raga - Redness or congestion',
      'Jwara - Fever',
      'Srava - Discharge',
      'Ruja – Pain',
    ],
  },
  {
    key: 'savisha-abhyanga',
    label: 'SAVISHA ABHYANGA [any oil application on body causing harmful effect]',
    symptoms: [
      'Kandu - Itching',
      'Ruja - Pain',
      'Kotha - Wheal like skin eruptions',
      'Pidaka - Papule / eruptions',
      'Romodgamah - Horripilation / ascent of hairs',
      'Cimicimayanam - Tingling sensation',
      'Shotha - Oedema',
      'Sphota - Blisters',
      'Srava - Discharge',
      'Twakpaka - Suppuration of skin',
      'Sweda - Perspiration',
      'Jwara - Fever',
      'Mamsadaranam - Cracks fissuring of mamsa',
      'Tvagdaha - Burning sensation in skin',
      'Avadaranam - Cracks fissuring of skin',
    ],
  },
  {
    key: 'savisha-utsadana',
    label: 'SAVISHA UTSADANA [any powder applications recently]',
    symptoms: [
      'Kandu - Itching',
      'Ruja - Pain',
      'Kotha - Wheal like skin eruptions',
      'Pidaka - Papule / eruptions',
      'Romodgamah - Horripilation / ascent of hairs',
      'Cimicimayanam - Tingling sensation',
      'Shotha - Oedema',
      'Sphota - Blisters',
      'Srava - Discharge',
      'Twakpaka - Suppuration of skin',
      'Sweda - Perspiration',
      'Jwara - Fever',
      'Mamsadaranam - Cracks fissuring of mamsa',
      'Tvagdaha - Burning sensation in skin',
      'Avadaranam - Cracks fissuring of skin',
    ],
  },
  {
    key: 'savisha-shiroabhyanga',
    label: 'SAVISHA SHIROABHYANGA [hair oil application recently causing toxic effect]',
    symptoms: [
      'Kesacyutih / kesasatah / kesacyavanam - Falling of hairs',
      'Shira ruja - Headache',
      'Uttamangesu granthijanma / granthi/ granthijanma - Appearance of nodular swelling on the scalp / supraclavicular parts',
      'Khebhyah rudhiragamah - Bleeding from the hair pores',
    ],
  },
  {
    key: 'savisha-snana',
    label: 'SAVISHA SNANA [contact with harmful / poisoned /polluted water]',
    symptoms: [
      'Kandu - Itching',
      'Artih - Pain',
      'Kotha - Wheal like skin eruptions',
      'Pidaka - Papule / eruptions',
      'Romodgamah - Horripilation / ascent of hairs',
      'Cimicimayanam - Tingling sensation',
      'Shotha - Oedema',
    ],
  },
];

type SymptomAnswers = {
  [symptom: string]: {
    answer: 'yes' | 'no' | '';
    ratings: boolean[];
  };
};

export function ExtrnalAgents() {
  const [modalOption, setModalOption] = useState<typeof agentOptions[0] | null>(null);
  const [symptomAnswers, setSymptomAnswers] = useState<SymptomAnswers>({});

  const handleAgentClick = (opt: typeof agentOptions[0]) => {
    if (opt.symptoms) {
      setModalOption(opt);
    }
  };

  const handleAnswer = (symptom: string, value: 'yes' | 'no') => {
    setSymptomAnswers((prev) => ({
      ...prev,
      [symptom]: {
        answer: value,
        ratings: value === 'yes' ? prev[symptom]?.ratings || [false, false, false] : [],
      },
    }));
  };

  const handleRating = (symptom: string, idx: number) => {
    setSymptomAnswers((prev) => {
      const ratings = prev[symptom]?.ratings ? [...prev[symptom].ratings] : [false, false, false];
      ratings[idx] = !ratings[idx];
      return {
        ...prev,
        [symptom]: {
          answer: 'yes',
          ratings,
        },
      };
    });
  };

  const closeModal = () => setModalOption(null);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-white dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-2 py-8 sm:py-16 transition-colors duration-500">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-indigo-200 dark:border-indigo-700 transition-colors duration-500">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-8 text-center">CONTACTS WITH SOME EXTERNAL AGENTS</h1>
        <div className="space-y-4">
          {agentOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className="w-full text-left px-4 py-3 rounded-lg border transition font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-700"
              onClick={() => handleAgentClick(opt)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      {/* Modal for agent symptoms */}
      {modalOption && modalOption.symptoms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4 text-center">{modalOption.label} Symptoms</h3>
            <form className="space-y-6 max-h-80 overflow-y-auto pr-2">
              {modalOption.symptoms.map((symptom) => (
                <div key={symptom} className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="font-medium text-gray-900 dark:text-gray-100 flex-1">{symptom}</span>
                    <div className="flex gap-4 mt-2 sm:mt-0">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name={symptom}
                          checked={symptomAnswers[symptom]?.answer === 'yes'}
                          onChange={() => handleAnswer(symptom, 'yes')}
                          className="accent-indigo-600 h-4 w-4"
                        />
                        <span className="text-indigo-600 dark:text-indigo-300 font-semibold">YES</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name={symptom}
                          checked={symptomAnswers[symptom]?.answer === 'no'}
                          onChange={() => handleAnswer(symptom, 'no')}
                          className="accent-gray-400 h-4 w-4"
                        />
                        <span className="text-gray-600 dark:text-gray-300 font-semibold">NO</span>
                      </label>
                    </div>
                  </div>
                  {symptomAnswers[symptom]?.answer === 'yes' && (
                    <div className="flex gap-4 mt-4 ml-2">
                      {[0, 1, 2].map((idx) => (
                        <label key={idx} className="flex flex-col items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!symptomAnswers[symptom]?.ratings?.[idx]}
                            onChange={() => handleRating(symptom, idx)}
                            className="accent-yellow-400 h-6 w-6"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-200 mt-1">{idx + 1}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 