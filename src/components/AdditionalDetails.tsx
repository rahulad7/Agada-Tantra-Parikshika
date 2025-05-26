import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdditionalDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    associatedComplaints: '',
    allergiesAssociated: '',
    anyBitePreviously: '',
    nidana: '',
    opd: '',
    opdNumber: '',
    ipd: '',
    ipdNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-500">
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 transition-colors duration-500">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          ← Back 
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-500">Additional Details</h1>
        <form className="space-y-8" onSubmit={e => { e.preventDefault(); navigate('/main-tabs'); }}>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">ASSOCIATED COMPLAINTS</label>
            <textarea
              name="associatedComplaints"
              value={formData.associatedComplaints}
              onChange={handleChange}
              maxLength={600}
              rows={3}
              placeholder="Enter up to 100 words"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">{formData.associatedComplaints.length}/600 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">ALLERGIES ASSOCIATED</label>
            <textarea
              name="allergiesAssociated"
              value={formData.allergiesAssociated}
              onChange={handleChange}
              maxLength={600}
              rows={3}
              placeholder="Enter up to 100 words"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">{formData.allergiesAssociated.length}/600 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">ANY BITE PREVIOUSLY (last 10 yrs)</label>
            <textarea
              name="anyBitePreviously"
              value={formData.anyBitePreviously}
              onChange={handleChange}
              maxLength={600}
              rows={3}
              placeholder="Enter up to 100 words"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">{formData.anyBitePreviously.length}/600 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">NIDANA <span className="text-gray-400">(optional)</span></label>
            <textarea
              name="nidana"
              value={formData.nidana}
              onChange={handleChange}
              maxLength={1200}
              rows={5}
              placeholder="Enter up to 200 words (optional)"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">{formData.nidana.length}/1200 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">OPD NO:</label>
            <div className="flex items-center gap-4 mb-2">
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.opd === 'yes' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-300'}`}>
                <input
                  type="radio"
                  name="opd"
                  value="yes"
                  checked={formData.opd === 'yes'}
                  onChange={handleChange}
                  className="hidden"
                />
                YES
              </label>
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.opd === 'no' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-300'}`}>
                <input
                  type="radio"
                  name="opd"
                  value="no"
                  checked={formData.opd === 'no'}
                  onChange={handleChange}
                  className="hidden"
                />
                NO
              </label>
            </div>
            {formData.opd === 'yes' && (
              <input
                type="text"
                name="opdNumber"
                value={formData.opdNumber}
                onChange={handleChange}
                placeholder="Enter OPD Number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">IPD NO:</label>
            <div className="flex items-center gap-4 mb-2">
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.ipd === 'yes' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-300'}`}>
                <input
                  type="radio"
                  name="ipd"
                  value="yes"
                  checked={formData.ipd === 'yes'}
                  onChange={handleChange}
                  className="hidden"
                />
                YES
              </label>
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.ipd === 'no' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-300'}`}>
                <input
                  type="radio"
                  name="ipd"
                  value="no"
                  checked={formData.ipd === 'no'}
                  onChange={handleChange}
                  className="hidden"
                />
                NO
              </label>
            </div>
            {formData.ipd === 'yes' && (
              <input
                type="text"
                name="ipdNumber"
                value={formData.ipdNumber}
                onChange={handleChange}
                placeholder="Enter IPD Number"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 