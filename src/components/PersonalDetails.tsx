import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

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

export function PersonalDetailsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PersonalDetails>({
    identity: '',
    name: '',
    age: '',
    gender: '',
    occupation: '',
    maritalStatus: '',
    socioEconomicStatus: '',
    address: '',
    dateOfAdmission: '',
    mainComplaints: ''
  });

  const fields = [
    {
      id: 'identity',
      label: 'Identity',
      type: 'select',
      options: [
        { value: 'doctor', label: 'Doctor' },
        { value: 'patient', label: 'Patient' },
        { value: 'student', label: 'Student' }
      ],
      required: true
    },
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      required: true
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      required: true
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ],
      required: true
    },
    {
      id: 'occupation',
      label: 'Occupation',
      type: 'text',
      required: true
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      required: true
    },
    {
      id: 'socioEconomicStatus',
      label: 'Socio Economic Status (Optional)',
      type: 'select',
      options: [
        { value: 'lower', label: 'Lower' },
        { value: 'middle', label: 'Middle' },
        { value: 'upper', label: 'Upper' }
      ],
      required: false
    },
    {
      id: 'dateOfAdmission',
      label: 'Date of Admission (Optional)',
      type: 'date',
      required: false
    },
    {
      id: 'address',
      label: 'Address',
      type: 'textarea',
      required: true
    },
    {
      id: 'mainComplaints',
      label: 'Main Complaints (200 words max)',
      type: 'textarea',
      required: true,
      maxLength: 1000
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('personalDetails', JSON.stringify(formData));
    navigate('/additional-details');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-indigo-100 to-emerald-100 dark:from-black dark:via-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-500 px-2 py-8 sm:py-16">
      <div className="w-full max-w-2xl p-4 sm:p-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-200 dark:border-gray-800 transition-colors duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Welcome to Agada Tantra Parikshika</h1>
          <p className="mt-1 text-base text-gray-600 dark:text-gray-300">Please fill in your personal details</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {fields.map((field) => (
            <div key={field.id} className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
              <label htmlFor={field.id} className="block text-base font-medium text-gray-900 dark:text-gray-200 mb-2">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <div className="relative">
                  <select
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof PersonalDetails]}
                    onChange={handleChange}
                    required={field.required}
                    className="block w-full rounded-lg bg-white dark:bg-gray-900 py-2 pl-3 pr-10 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              ) : field.type === 'textarea' ? (
                <div>
                  <textarea
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof PersonalDetails]}
                    onChange={handleChange}
                    required={field.required}
                    maxLength={field.maxLength}
                    rows={field.id === 'mainComplaints' ? 6 : 3}
                    className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
                  />
                  {field.id === 'mainComplaints' && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {formData.mainComplaints.length}/1000 characters
                    </p>
                  )}
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof PersonalDetails]}
                  onChange={handleChange}
                  required={field.required}
                  className="block w-full rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 sm:text-base transition-all"
                />
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 px-10 py-3 text-base font-semibold text-white shadow-lg hover:from-indigo-600 hover:to-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 