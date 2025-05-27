import { useState } from "react";
import { useNavigate } from "react-router-dom";

type OrganismOption = {
  key: string;
  label: string;
  subOptions?: string[];
};

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
  const [selectedOrganism, setSelectedOrganism] = useState("");
  const [selectedSarpa, setSelectedSarpa] = useState("");
  const [timeOfBite, setTimeOfBite] = useState("");
  const [siteOfBite, setSiteOfBite] = useState("");
  const [modalOption, setModalOption] = useState<OrganismOption | null>(null);
  const [sarpaModal, setSarpaModal] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOptionClick = (opt: OrganismOption) => {
    setSelectedOrganism(opt.key);
    if (opt.subOptions && opt.key !== "sarpa") {
      setModalOption(opt);
    } else {
      setModalOption(null);
      setSelectedSarpa("");
    }
  };

  const handleSubOptionSelect = (sub: string) => {
    setSelectedSarpa(sub);
    setModalOption(null);
  };

  const closeModal = () => setModalOption(null);

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
                    className={`w-full text-left px-4 py-3 rounded-lg border transition font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 ${
                      selectedOrganism === opt.key
                        ? "bg-indigo-600 text-white dark:bg-indigo-700"
                        : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handleOptionClick(opt)}
                  >
                    {opt.label}
                  </button>
                  {/* SARPA [SNAKE] suboptions inline */}
                  {opt.key === "sarpa" &&
                    selectedOrganism === "sarpa" &&
                    opt.subOptions && (
                      <div className="mt-4 ml-4 space-y-2">
                        {opt.subOptions.map((sub) => (
                          <label
                            key={sub}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="sarpaType"
                              value={sub}
                              checked={selectedSarpa === sub}
                              onChange={() => {
                                setSelectedSarpa(sub);
                                if (sarpaSubtypeSymptoms[sub])
                                  setSarpaModal(sub);
                              }}
                              className="accent-indigo-600 h-4 w-4"
                            />
                            <span className="text-gray-800 dark:text-gray-200">
                              {sub}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  {/* No suboptions message for options without subOptions */}
                  {selectedOrganism === opt.key && !opt.subOptions && (
                    <div className="mt-2 text-indigo-700 dark:text-indigo-300 text-sm">
                      No sub-options.
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
          </div>
        </div>
      </div>
      {/* Modal for subOptions */}
      {modalOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/70 dark:bg-gray-800/70 text-gray-500 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition-all"
              style={{ lineHeight: 1 }}
              onClick={closeModal}
              aria-label="Close"
            >
              <span className="text-2xl sm:text-xl font-bold leading-none">
                ×
              </span>
            </button>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4 text-center">
              {modalOption.label} Symptoms
            </h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {modalOption.subOptions?.map((sub) => (
                <button
                  key={sub}
                  className={`w-full text-left px-4 py-2 rounded-lg border transition font-medium text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 ${
                    selectedSarpa === sub
                      ? "bg-indigo-600 text-white dark:bg-indigo-700"
                      : "bg-indigo-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleSubOptionSelect(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Modal for SARPA subtype symptoms */}
      {sarpaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-2xl font-bold"
              onClick={() => setSarpaModal(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4 text-center">
              {sarpaModal} Symptoms
            </h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {sarpaSubtypeSymptoms[sarpaModal]?.map((symptom) => (
                <div
                  key={symptom}
                  className="px-4 py-2 rounded-lg bg-indigo-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                >
                  {symptom}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
