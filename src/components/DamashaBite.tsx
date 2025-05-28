import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Export the OrganismOption interface
export interface OrganismOption {
  key: string;
  label: string;
  subOptions?: string[];
}

const organismOptions: OrganismOption[] = [
  {
    key: "sarpa",
    label: "SARPA [SNAKE]",
    subOptions: ["A. DARVIKARA SARPA", "B. MANDALI SARPA", "C. RAJIMANTHA"],
  },
  {
    key: "vrischika",
    label: "VRISCHIKA [SCORPION]",
    subOptions: [
      "1. Vahnivat dahanam (adau) - Burning sensation like fire",
      "2. Ksipram urdhvarohanam - Quick spreading in upward direction",
      "3. Damse ruja tisthati (pascat) - Pain remains at bite site",
      "4. Sadyah ati ruk - Instant severe pain",
      "5. Damsasyavata - Brownish discoloration of bite site",
      "6. Damsatodah - Pricking pain at bite site",
      "7. Dmsa sphutati iva - Splitting type of pain at site",
    ],
  },
  {
    key: "loota",
    label: "LOOTA [SPIDER]",
    subOptions: [
      "1. Karnika - Thorny",
      "2. Shopha - Oedema",
      "3. Jwara - Fever",
      "4. Kandu - Itching",
      "5. Arochaka - Tastelessness",
    ],
  },
  {
    key: "kita",
    label: "KITA [INSECT BITE]",
    subOptions: [
      "1. Karnika - Thorny",
      "2. Shopha - Oedema",
      "3. Jwara - Fever",
      "4. Kandu - Itching",
      "5. Arochaka - Tastelessness",
    ],
  },
  {
    key: "vyala",
    label: "VYALA SRRUGLA TRAKSHA RUKSHA VYAGHRI DASTA LAKSHANA (animal bites)",
    subOptions: [
      "1. Suptata - Numbness",
      "2. Krusnam cha atisravati asruk - Copious flow of dark blood",
      "3. Trushna - Thirst",
      "4. Murccha - Syncope",
      "5. Bhranti - Confusion",
      "6. Daha - Burning sensation",
      "7. Jwara - Fever",
      "8. Kandu - Itching",
      "9. Toda - Pricking pain",
      "10. Vaivarnya - Discoloration",
      "11. Supti - Numbness",
      "12. Kledopasosanam - Drying up of discharges",
      "13. Vidaha - Internal burning",
      "14. Raga - Redness",
      "15. Ruk - Pain",
      "16. Paka - Suppuration",
      "17. Shopha - Oedema",
      "18. Granthi nikunchana - Constriction of glandular swelling",
      "19. Damsavadarana - Cracking of the tissue in place of bite",
      "20. Sphota - Blisters",
      "21. Karnika - Polyp or protuberence",
      "22. Mandalani - Circular patches",
      "23. Jwara - Fever",
      "24. Yena dastastasya chesta - Imitates the actions of animal by which he has been bitten",
      "25. Yena dastastasya rutam - Imitates the sounds of animal by which he has been bitten",
      "26. Bahusha pratikriya - Reacts in many ways",
      "27. Kriya hina - Becomes actionless",
    ],
  },
  {
    key: "alarka",
    label: "ALARKA [DOG]",
    subOptions: [
      "1. Suptah - Numbness",
      "2. Krusnam asruk ksarati - blackish bleeding",
      "3. Hrudruk - Precordial pain / cardiac pain",
      "4. Shira ruja - Headache",
      "5. Jwara - Fever",
      "6. Stambha - Rigidity or stiffness",
      "7. Trushna - Thirst",
      "8. Murccha – Syncope",
    ],
  },
  {
    key: "mushika",
    label: "MUSHIKA [RAT]",
    subOptions: [
      "1. Granthayah - Nodular swelling",
      "2. Shopha - Oedema",
      "3. Karnika - Resembling lotus seed",
      "4. Mandalani - Circular patches",
      "5. Ugrapidakopacayah - Intense growth of papules",
      "6. Visarpa - Spreading cellulitis / erysipelas",
      "7. Kitibhah - Clinical features of kitibha",
      "8. Parvabheda - Breaking type of pain in small joints",
      "9. Tivra ruja - Severe pain",
      "10. Murccha - Syncope",
      "11. Anga sada - Exhaustion",
      "12. Jwara - Fever",
      "13. Daurbalya - Weakness",
      "14. Aruchi - Tastelessness",
      "15. Swasa - Difficult breathing",
      "16. Chardi - Vomiting",
      "17. Loma harsa - Horripilation",
      "18. Adamsat sonitapravrutti - Bleeding from bite site",
      "19. Pandu - Pallor",
      "20. Daha - Burning sensation",
    ],
  },
];

// SARPA subtype symptoms mapping
const sarpaSubtypeSymptoms: Record<string, string[]> = {
  "A. DARVIKARA SARPA": [
    "1. Twak krushna - blackish skin",
    "2. Nayana krushna - blackish eyes",
    "3. Nakha krushna - blackish nails",
    "4. Dasana krushna - blackish teeth",
    "5. Vadana krushna - blackish face",
    "6. Mutra krushna - blackish urine",
    "7. Purisha krushna - blackish feces",
    "8. Damsha krushna - blackish bite site",
    "9. Rukshata - Dryness",
    "10. Shira gaurava - Heaviness of head",
    "11. Sandhi vedana - Pain in joints",
    "12. Kati daurbalya - Weakness of lowback",
    "13. Prustha daurbalya - Weakness of back",
    "14. Griva daurbalya - Weakness of neck",
    "15. Jrumbha - Yawning",
    "16. Vepathu - Shivering / tremors",
    "17. Swara avasada - Sunken voice",
    "18. Ghurghuraka - Making ghhurghur sound",
    "19. Jadata - Inactiveness",
    "20. Shuska udgara - Dry eructations",
    "21. Kasa - Cough",
    "22. Swasa - Difficult breathing",
    "23. Hikka - Hiccup",
    "24. Vayu urdhvagamana - Upward movement of vayu",
    "25. Shula - Colicky pain in the abdomen",
    "26. Udvestana - Convulsive movements of body",
    "27. Trushna - Thirst",
    "28. Lala srava - Salivation",
    "29. Phenagamana - Frothy vomiting",
    "30. Sroto avarodha - Blocking of srotas",
    "31. Vata vedana - Pain of vata origin",
  ],
  "B. MANDALI SARPA": [
    "1. Tvagadinam pitatvam - yellowish discoloration of skin etc.",
    "2. Sheeta abhilasha - Desire for cold",
    "3. Paridhupanam - Fumigating sensation",
    "4. Daha - Burning sensation",
    "5. Trushna - Thirst",
    "6. Mada - Insanity",
    "7. Murccha - Syncope",
    "8. Jwara - Fever",
    "9. Urdhvam sonita gamana - Bleeding from upper orifices of body",
    "10. Adhah sonita gamana - Bleeding from lower orifices of body",
    "11. Mamsavasatana - Decaying of mamsa",
    "12. Svayathu - Swelling",
    "13. Dmsha kotha - Necrosis at bite site",
    "14. Pita rupa darsana - Yellowish appearance",
    "15. Ashu kopa - Quick anger",
    "16. Pitta vedana - Pain of pitta type",
    "17. Osha - Burning sensation with sweating and restlessness",
    "18. Chosha - Sucking type of pain",
  ],
  "C. RAJIMANTHA": [
    "1. Tvagadinam suklatvam - whitish discoloration of skin etc.",
    "2. Sheeta jwara - Fever with chills",
    "3. Roma harsha - Horripilation",
    "4. Gatra stambha - Stiffness of body parts",
    "5. Adamsashophah - Swelling at bite site",
    "6. Sandrakapha praseka - thick salivation",
    "7. Chardiabhiksnam - Constant vomiting",
  ],
};

export function DamashaBite() {
  const [selectedOrganism, setSelectedOrganism] = useState<string | null>(null);
  const [selectedSarpaSubtype, setSelectedSarpaSubtype] = useState<string | null>(null);
  const [subOptionState, setSubOptionState] = useState<Record<string, Record<string, { choice: "yes" | "no" | null, grade: number | null }>>>({});
  const [timeOfBite, setTimeOfBite] = useState("");
  const [siteOfBite, setSiteOfBite] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for validation errors

  const handleOptionClick = (opt: OrganismOption) => {
    setSelectedOrganism(selectedOrganism === opt.key ? null : opt.key);
    setSubOptionState({});
    if (opt.key !== 'sarpa') {
      setSelectedSarpaSubtype(null);
    }
  };

  const handleSarpaSubtypeClick = (subOpt: string) => {
    setSelectedSarpaSubtype(selectedSarpaSubtype === subOpt ? null : subOpt);
  };

  const handleSubOptionChange = (organismKey: string, subOption: string, choice: "yes" | "no") => {
    setSubOptionState(prevState => ({
      ...prevState,
      [organismKey]: {
        ...prevState[organismKey],
        [subOption]: {
          choice: choice,
          grade: choice === "yes" ? (prevState[organismKey]?.[subOption]?.grade ?? 1) : null,
        }
      }
    }));
  };

  const handleGradeChange = (organismKey: string, subOption: string, grade: number) => {
    setSubOptionState(prevState => ({
      ...prevState,
      [organismKey]: {
        ...prevState[organismKey],
        [subOption]: {
          ...prevState[organismKey]?.[subOption],
          grade: grade,
        }
      }
    }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedOrganism) {
      newErrors.selectedOrganism = 'Please select an organism.';
    }
    if (!timeOfBite.trim()) {
      newErrors.timeOfBite = 'Time of Bite is required.';
    }
    if (!siteOfBite.trim()) {
      newErrors.siteOfBite = 'Site of Bite is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form before saving and navigating
    if (validateForm()) {
      // Gather all data
      const damashaData = {
        selectedOrganism,
        selectedSarpaSubtype,
        subOptionState,
        timeOfBite,
        siteOfBite,
      };

      // Retrieve data from previous pages from localStorage
      const personalData = JSON.parse(localStorage.getItem('personalDetails') || '{}');
      const additionalData = JSON.parse(localStorage.getItem('additionalDetails') || '{}');

      // Combine all data
      const allFormData = {
        personal: personalData,
        additional: additionalData,
        damasha: damashaData,
      };

      // Save combined data to localStorage
      localStorage.setItem('allFormData', JSON.stringify(allFormData));

      // Navigate to Conclusion page
      navigate('/damsha-conclusion');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-white dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-2 py-8 sm:py-16 transition-colors duration-500">
      <div className="w-full max-w-2xl p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-indigo-200 dark:border-indigo-700 transition-colors duration-500">
        <button
          type="button"
          onClick={() => navigate("/main-tabs")}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-indigo-700 dark:text-indigo-300 rounded-lg shadow border border-indigo-200 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-700 transition font-semibold text-base"
        >
          <span className="text-xl">←</span> Back
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-8 text-center">
          DAMSHA / BITE
        </h1>
        <div className="space-y-8">
          <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-6 border border-indigo-100 dark:border-gray-700 transition-colors duration-500">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              I. BITE OF WHICH ORGANISMS
            </h2>
            <div className="grid gap-4">
              {organismOptions.map((opt) => (
                <div key={opt.key}>
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-3 rounded-lg border transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600
                      ${selectedOrganism === opt.key
                        ? "bg-indigo-600 text-white dark:bg-indigo-700"
                        : "bg-indigo-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-700"}
                    `}
                    onClick={() => handleOptionClick(opt)}
                  >
                    {opt.label}
                  </button>

                  {/* Render SARPA sub-options */}
                  {opt.key === 'sarpa' && selectedOrganism === 'sarpa' && opt.subOptions && (
                    <div className="mt-4 ml-4 border-l-2 border-indigo-300 dark:border-indigo-600 pl-4 space-y-3">
                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Sub-options:</h3>
                        {/* Render SARPA sub-options as buttons with symptoms nested */}
                        {opt.subOptions.map((subOpt) => (
                            <div key={subOpt}>
                                <button
                                    type="button"
                                    className={`w-full text-left px-4 py-2 rounded-lg border transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600
                                        ${selectedSarpaSubtype === subOpt
                                            ? "bg-indigo-500 text-white dark:bg-indigo-600"
                                            : "bg-indigo-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-indigo-200 dark:hover:bg-gray-600"}
                                    `}
                                    onClick={() => handleSarpaSubtypeClick(subOpt)}
                                >
                                    {subOpt}
                                </button>
                                {/* Render symptoms only if this SARPA sub-option is selected */}
                                {selectedSarpaSubtype === subOpt && sarpaSubtypeSymptoms[subOpt]?.length > 0 && (
                                    <div className="mt-4 space-y-4 ml-4">
                                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 dark:text-gray-100">Symptoms:</h4>
                                        {sarpaSubtypeSymptoms[subOpt].map((symptom, sympIdx) => {
                                            const symptomState = subOptionState[opt.key]?.[symptom];
                                            return (
                                                <div key={sympIdx} className="flex flex-col space-y-2">
                                                    <p className="text-gray-700 dark:text-gray-300 text-sm">{symptom}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-gray-700 dark:text-gray-300 text-sm">Present?</span>
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                className={`px-3 py-1 rounded-l-md border transition ${symptomState?.choice === 'yes' ? 'bg-green-500 text-white border-green-600' : 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'} hover:opacity-90`}
                                                                onClick={(e) => {e.stopPropagation(); handleSubOptionChange(opt.key, symptom, 'yes');}}
                                                            >
                                                                YES
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={`px-3 py-1 rounded-r-md border transition ${symptomState?.choice === 'no' ? 'bg-red-500 text-white border-red-600' : 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'} hover:opacity-90`}
                                                                onClick={(e) => {e.stopPropagation(); handleSubOptionChange(opt.key, symptom, 'no');}}
                                                            >
                                                                NO
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {symptomState?.choice === 'yes' && (
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <span className="text-gray-700 dark:text-gray-300 text-sm">Grade Level:</span>
                                                            <div className="flex items-center gap-4 w-48">
                                                                <input
                                                                    type="range"
                                                                    min="1"
                                                                    max="3"
                                                                    step="1"
                                                                    value={symptomState?.grade ?? 1}
                                                                    onChange={(e) => handleGradeChange(opt.key, symptom, parseInt(e.target.value))}
                                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                                                                />
                                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[1.5rem] text-center">
                                                                    {symptomState?.grade ?? 1}
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
                  )}

                  {/* Original rendering for non-SARPA organisms */}
                  {opt.key !== 'sarpa' && selectedOrganism === opt.key && opt.subOptions && (
                    <div className="mt-4 ml-4 border-l-2 border-indigo-300 dark:border-indigo-600 pl-4 space-y-3">
                      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Sub-options:</h3>
                      {opt.subOptions.map((subOpt) => {
                        const currentState = subOptionState[opt.key]?.[subOpt];

                        return (
                          <div key={subOpt} className="flex flex-col space-y-2">
                            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{subOpt}</p>

                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-gray-700 dark:text-gray-300 text-sm">Present?</span>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className={`px-3 py-1 rounded-l-md border transition ${currentState?.choice === 'yes' ? 'bg-green-500 text-white border-green-600' : 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'} hover:opacity-90`}
                                  onClick={(e) => {e.stopPropagation(); handleSubOptionChange(opt.key, subOpt, 'yes');}}
                                >
                                  YES
                                </button>
                                <button
                                  type="button"
                                  className={`px-3 py-1 rounded-r-md border transition ${currentState?.choice === 'no' ? 'bg-red-500 text-white border-red-600' : 'bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'} hover:opacity-90`}
                                  onClick={(e) => {e.stopPropagation(); handleSubOptionChange(opt.key, subOpt, 'no');}}
                                >
                                  NO
                                </button>
                              </div>
                            </div>

                            {currentState?.choice === 'yes' && (
                              <div className="flex items-center gap-4 mt-3">
                                <span className="text-gray-700 dark:text-gray-300 text-sm">Grade Level:</span>
                                <div className="flex items-center gap-4 w-48">
                                  <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="1"
                                    value={currentState?.grade ?? 1}
                                    onChange={(e) => handleGradeChange(opt.key, subOpt, parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
                                  />
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[1.5rem] text-center">
                                    {currentState?.grade ?? 1}
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
          </div>
          <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-6 border border-indigo-100 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
              II. TIME OF BITE
            </label>
            <input
              type="text"
              value={timeOfBite}
              onChange={(e) => setTimeOfBite(e.target.value)}
              placeholder="Enter time of bite"
              className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.timeOfBite && <p className="mt-1 text-xs text-red-500">{errors.timeOfBite}</p>}
          </div>
          <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-6 border border-indigo-100 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
              III. SITE OF BITE
            </label>
            <input
              type="text"
              value={siteOfBite}
              onChange={(e) => setSiteOfBite(e.target.value)}
              placeholder="Enter site of bite"
              className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.siteOfBite && <p className="mt-1 text-xs text-red-500">{errors.siteOfBite}</p>}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow border border-indigo-600 hover:bg-indigo-600 transition font-semibold text-base"
          >
            <span className="text-xl">→</span> Submit and Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// Export organismOptions
export { organismOptions };
