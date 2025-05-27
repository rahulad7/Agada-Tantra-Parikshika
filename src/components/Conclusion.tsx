import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface PersonalDetails {
  identity: string;
  name: string;
  age: string;
  gender: string;
  occupation: string;
  maritalStatus: string;
  socioEconomicStatus: string;
  address: string;
  dateOfAdmission: string;
  mainComplaints: string;
}

interface AdditionalDetails {
  associatedComplaints: string;
  allergiesAssociated: string;
  anyBitePreviously: string;
  nidana: string;
  opd: string;
  opdNumber: string;
  ipd: string;
  ipdNumber: string;
}

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

export function Conclusion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, ratings, dushiAnswers, dushiRatings } = location.state || {};
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails | null>(null);

  useEffect(() => {
    const storedPersonalDetails = localStorage.getItem('personalDetails');
    const storedAdditionalDetails = localStorage.getItem('additionalDetails');
    
    if (storedPersonalDetails) {
      setPersonalDetails(JSON.parse(storedPersonalDetails));
    }
    if (storedAdditionalDetails) {
      setAdditionalDetails(JSON.parse(storedAdditionalDetails));
    }
  }, []);

  // --- GRADE CALCULATION ---
  const totalQuestions = garaQuestions.length + dushiQuestions.length;
  const maxGrade = totalQuestions * 3;
  let totalGrade = 0;
  const garaChosenGrades: { [key: string]: number } = {};
  garaQuestions.forEach(q => {
    if (answers && answers[q.key] === 'yes' && ratings && ratings[q.key]) {
      totalGrade += ratings[q.key];
      garaChosenGrades[q.key] = ratings[q.key];
    }
  });
  const dushiChosenGrades: { [key: string]: number } = {};
  dushiQuestions.forEach(q => {
    if (dushiAnswers && dushiAnswers[q.key] === 'yes' && dushiRatings && dushiRatings[q.key]) {
      totalGrade += dushiRatings[q.key];
      dushiChosenGrades[q.key] = dushiRatings[q.key];
    }
  });
  const gradePercent = maxGrade > 0 ? Math.round((totalGrade / maxGrade) * 100) : 0;
  let severity = 'Mild';
  if (gradePercent > 80) severity = 'Severe Complicated';
  else if (gradePercent > 60) severity = 'Alarming High Alert';
  else if (gradePercent > 50) severity = 'Moderate';
  else severity = 'Mild';

  // Debug output
  console.log('Gara Chosen Grades:', garaChosenGrades);
  console.log('Dushi Chosen Grades:', dushiChosenGrades);
  console.log('Total Grade:', totalGrade);
  console.log('Max Grade:', maxGrade);
  console.log('Grade Percent:', gradePercent);
  console.log('Severity:', severity);

  if (!location.state) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-500 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">No Data Available</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Please complete the questionnaire first.</p>
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
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">Patient Report Summary</h1>
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

        {/* --- GRADE SUMMARY --- */}
        <section className="bg-gradient-to-r from-indigo-100 via-yellow-100 to-emerald-100 dark:from-indigo-900 dark:via-yellow-900 dark:to-emerald-900 rounded-2xl shadow p-6 border-2 border-indigo-300 dark:border-indigo-700 flex flex-col items-center mb-6">
          <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-200 mb-2">Overall Toxicity Grade</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-3xl font-extrabold text-indigo-800 dark:text-yellow-200">{gradePercent}%</span>
            <span className={`px-4 py-2 rounded-lg text-lg font-semibold ${
              severity === 'Mild' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' :
              severity === 'Moderate' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              severity === 'Alarming High Alert' ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {severity}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            {severity === 'Mild' && '≤ 50%: Mild'}
            {severity === 'Moderate' && '51–60%: Moderate'}
            {severity === 'Alarming High Alert' && '61–80%: Alarming High Alert'}
            {severity === 'Severe Complicated' && '81–100%: Severe Complicated'}
          </p>
        </section>

        {/* Personal Details Section */}
        {personalDetails && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-indigo-200 dark:border-indigo-700">
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Identity</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.identity}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.name}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.age}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Gender</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.gender}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Occupation</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.occupation}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Marital Status</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.maritalStatus}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Socio-Economic Status</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.socioEconomicStatus}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Date of Admission</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.dateOfAdmission}</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.address}</p>
            </div>
            <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Main Complaints</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{personalDetails.mainComplaints}</p>
            </div>
          </section>
        )}

        {/* Additional Details Section */}
        {additionalDetails && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-yellow-200 dark:border-yellow-700">
            <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-6">Additional Details</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Associated Complaints</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{additionalDetails.associatedComplaints}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Allergies Associated</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{additionalDetails.allergiesAssociated}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Any Bite Previously (last 10 yrs)</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{additionalDetails.anyBitePreviously}</p>
              </div>
              {additionalDetails.nidana && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nidana</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{additionalDetails.nidana}</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">OPD Status</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {additionalDetails.opd === 'yes' 
                      ? `Yes (Number: ${additionalDetails.opdNumber})`
                      : 'No'}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">IPD Status</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {additionalDetails.ipd === 'yes'
                      ? `Yes (Number: ${additionalDetails.ipdNumber})`
                      : 'No'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gara Visha Section */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-indigo-200 dark:border-indigo-700">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">Gara Visha Responses</h2>
          <div className="space-y-4">
            {garaQuestions.map((q) => (
              <div key={q.key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-gray-900 dark:text-gray-100">G{q.key}. {q.text}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Response:</span>
                    <span className={`text-sm font-medium ${answers[q.key] === 'yes' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {answers[q.key]?.toUpperCase()}
                    </span>
                    {answers[q.key] === 'yes' && (
                      <span className="text-sm text-yellow-600 dark:text-yellow-400 ml-2">
                        (Grade: {ratings[q.key]})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dushi Visha Section */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-yellow-200 dark:border-yellow-700">
          <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-6">Dushi Visha Responses</h2>
          <div className="space-y-4">
            {dushiQuestions.map((q) => (
              <div key={q.key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{q.key}. {q.text}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Response:</span>
                    <span className={`text-sm font-medium ${dushiAnswers[q.key] === 'yes' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {dushiAnswers[q.key]?.toUpperCase()}
                    </span>
                    {dushiAnswers[q.key] === 'yes' && (
                      <span className="text-sm text-yellow-600 dark:text-yellow-400 ml-2">
                        (Grade: {dushiRatings[q.key]})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
