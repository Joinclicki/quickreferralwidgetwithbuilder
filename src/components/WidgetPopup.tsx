import React, { useState } from 'react';
import { X, DollarSign, User, Phone, Mail, Building } from 'lucide-react';

interface WidgetPopupProps {
  videoUrl: string;
  rewardsText: string;
  headerText: string;
  formFields: { label: string; type: string; name: string }[];
  webhookUrl: string;
  onClose: () => void;
  buttonColor: string;
}

const WidgetPopup: React.FC<WidgetPopupProps> = ({
  videoUrl,
  rewardsText,
  headerText,
  formFields,
  webhookUrl,
  onClose,
  buttonColor,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const getIconForField = (fieldName: string) => {
    switch (fieldName.toLowerCase()) {
      case 'name':
        return <User size={20} className="text-gray-400" />;
      case 'phone':
        return <Phone size={20} className="text-gray-400" />;
      case 'email':
        return <Mail size={20} className="text-gray-400" />;
      case 'business':
        return <Building size={20} className="text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-center">
          {isSubmitted ? 'Thank You!' : headerText}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 pb-20">
        {isSubmitted ? (
          <div className="text-center py-10">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your referral has been submitted!</h3>
            <p className="text-gray-600">Thank you for your referral. We appreciate your support!</p>
          </div>
        ) : (
          <>
            {videoUrl && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="200"
                  src={videoUrl}
                  title="Embedded video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {rewardsText && (
              <div className="mb-4 p-4 bg-green-100 rounded-lg">
                <h3 className="text-lg font-semibold flex items-center">
                  <DollarSign size={24} className="mr-2 text-green-500" />
                  Earn rewards!
                </h3>
                <p className="text-sm text-gray-700">{rewardsText}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {formFields.map((field, index) => (
                <div key={index} className="mb-4">
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {getIconForField(field.name)}
                    </div>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      required
                    />
                  </div>
                </div>
              ))}
            </form>
          </>
        )}
      </div>

      {!isSubmitted && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity duration-300"
            style={{ backgroundColor: buttonColor }}
          >
            Send Referral
          </button>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 flex justify-center">
        <a href="https://joinclicki.com/?widget" target="_blank" rel="noopener noreferrer">
          <img
            src="https://clicki-unlayer-uploads.s3.us-east-1.amazonaws.com/1712037184377-Group+46923.png"
            alt="Get more referrals with Clicki"
            className="w-full max-w-[30%]"
          />
        </a>
      </div>
    </div>
  );
};

export default WidgetPopup;