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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.associatedComplaints.trim()) {
      newErrors.associatedComplaints = 'Associated Complaints is required';
    }
    if (!formData.allergiesAssociated.trim()) {
      newErrors.allergiesAssociated = 'Allergies Associated is required';
    }
    if (!formData.anyBitePreviously.trim()) {
      newErrors.anyBitePreviously = 'Any Bite Previously is required';
    }
    if (!formData.opd) {
      newErrors.opd = 'OPD selection is required';
    } else if (formData.opd === 'yes' && !formData.opdNumber.trim()) {
      newErrors.opdNumber = 'OPD Number is required';
    }
    if (!formData.ipd) {
      newErrors.ipd = 'IPD selection is required';
    } else if (formData.ipd === 'yes' && !formData.ipdNumber.trim()) {
      newErrors.ipdNumber = 'IPD Number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Save form data to localStorage
      localStorage.setItem('additionalDetails', JSON.stringify(formData));
      navigate('/main-tabs');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-indigo-100 to-emerald-100 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-500 px-2 py-8 sm:py-16">
      <div className="w-full max-w-2xl p-4 sm:p-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-200 dark:border-gray-800 transition-colors duration-500">
        <button
          type="button"
          onClick={() => navigate('/')} 
          className="flex mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          ← Back
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-8 text-center">Additional Details</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-2">ASSOCIATED COMPLAINTS</label>
            <textarea
              name="associatedComplaints"
              value={formData.associatedComplaints}
              onChange={handleChange}
              maxLength={600}
              rows={3}
              placeholder="Enter up to 100 words"
              className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.associatedComplaints.length}/600 characters</p>
            {errors.associatedComplaints && <p className="mt-1 text-xs text-red-500">{errors.associatedComplaints}</p>}
          </div>
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-2">ALLERGIES ASSOCIATED</label>
            <textarea
              name="allergiesAssociated"
              value={formData.allergiesAssociated}
              onChange={handleChange}
              maxLength={600}
              rows={3}
              placeholder="Enter up to 100 words"
              className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.allergiesAssociated.length}/600 characters</p>
            {errors.allergiesAssociated && <p className="mt-1 text-xs text-red-500">{errors.allergiesAssociated}</p>}
          </div>
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-2">ANY BITE PREVIOUSLY (last 10 yrs)</label>
            <textarea
              name="anyBitePreviously"
              value={formData.anyBitePreviously}
              onChange={handleChange}
              maxLength={600}
              rows={3}
              placeholder="Enter up to 100 words"
              className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.anyBitePreviously.length}/600 characters</p>
            {errors.anyBitePreviously && <p className="mt-1 text-xs text-red-500">{errors.anyBitePreviously}</p>}
          </div>
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-2">NIDANA <span className="text-gray-400">(optional)</span></label>
            <textarea
              name="nidana"
              value={formData.nidana}
              onChange={handleChange}
              maxLength={1200}
              rows={5}
              placeholder="Enter up to 200 words (optional)"
              className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.nidana.length}/1200 characters</p>
          </div>
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-2">OPD NO:</label>
            <div className="flex items-center gap-4 mb-2">
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.opd === 'yes' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'}`}>
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
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.opd === 'no' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'}`}>
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
            {!formData.opd && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Please select an item in the list</p>}
            {errors.opd && <p className="mt-1 text-xs text-red-500">{errors.opd}</p>}
            {formData.opd === 'yes' && (
              <input
                type="text"
                name="opdNumber"
                value={formData.opdNumber}
                onChange={handleChange}
                placeholder="Enter OPD Number"
                className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
              />
            )}
            {errors.opdNumber && <p className="mt-1 text-xs text-red-500">{errors.opdNumber}</p>}
          </div>
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
            <label className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-2">IPD NO:</label>
            <div className="flex items-center gap-4 mb-2">
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.ipd === 'yes' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'}`}>
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
              <label className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.ipd === 'no' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'}`}>
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
            {!formData.ipd && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Please select an item in the list</p>}
            {errors.ipd && <p className="mt-1 text-xs text-red-500">{errors.ipd}</p>}
            {formData.ipd === 'yes' && (
              <input
                type="text"
                name="ipdNumber"
                value={formData.ipdNumber}
                onChange={handleChange}
                placeholder="Enter IPD Number"
                className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
              />
            )}
            {errors.ipdNumber && <p className="mt-1 text-xs text-red-500">{errors.ipdNumber}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-10 py-3 text-base font-semibold text-white shadow-lg hover:from-indigo-600 hover:to-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 