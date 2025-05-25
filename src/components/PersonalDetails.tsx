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
    <div className="min-h-screen w-full bg-white dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome to Agada Tantra Parikshika</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Please fill in your personal details</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {fields.map((field) => (
              <div key={field.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-500">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
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
                      className="block w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
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
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    />
                    {field.id === 'mainComplaints' && (
                      <p className="mt-2 text-sm text-gray-500">
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 