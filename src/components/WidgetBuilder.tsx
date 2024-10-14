import React, { useState, useRef } from 'react';
import Widget from './Widget';

const WidgetBuilder: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [rewardsText, setRewardsText] = useState('');
  const [headerText, setHeaderText] = useState('Refer a business to Clicki Referrals! 👋');
  const [formFields, setFormFields] = useState([
    { label: 'What is your name?', type: 'text', name: 'name' },
    { label: 'What is your email?', type: 'email', name: 'email' },
    { label: 'What is your phone?', type: 'tel', name: 'phone' },
    { label: 'Who do you want to refer?', type: 'text', name: 'referral' },
    { label: 'What is their best phone number?', type: 'tel', name: 'referralPhone' },
  ]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [widgetColor, setWidgetColor] = useState('#2563eb'); // Default blue color
  const [buttonColor, setButtonColor] = useState('#2563eb'); // Default blue color
  const embedCodeRef = useRef<HTMLTextAreaElement>(null);

  const addFormField = () => {
    setFormFields([...formFields, { label: '', type: 'text', name: '' }]);
  };

  const updateFormField = (index: number, field: string, value: string) => {
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setFormFields(updatedFields);
  };

  const removeFormField = (index: number) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };

  const generateEmbedCode = () => {
    const config = {
      videoUrl,
      rewardsText,
      headerText,
      formFields,
      webhookUrl,
      widgetColor,
      buttonColor,
    };
    const encodedConfig = encodeURIComponent(JSON.stringify(config));
    return `
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://quickreferralwidgetwithbuilder.vercel.app/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = function() {
      window.initClickiWidget(${encodedConfig});
    };
  })();
</script>
    `.trim();
  };

  const copyEmbedCode = () => {
    if (embedCodeRef.current) {
      embedCodeRef.current.select();
      document.execCommand('copy');
      alert('Embed code copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Widget Builder</h1>
      <div className="mb-4">
        <label htmlFor="headerText" className="block text-sm font-medium text-gray-700 mb-1">
          Header Text
        </label>
        <input
          type="text"
          id="headerText"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter header text"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Video URL (e.g., YouTube or Vimeo embed URL)
        </label>
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rewardsText" className="block text-sm font-medium text-gray-700 mb-1">
          Rewards Text
        </label>
        <textarea
          id="rewardsText"
          value={rewardsText}
          onChange={(e) => setRewardsText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Form Fields</h3>
        {formFields.map((field, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateFormField(index, 'label', e.target.value)}
              placeholder="Label"
              className="w-1/3 px-3 py-2 border border-gray-300 rounded-md mr-2"
            />
            <select
              value={field.type}
              onChange={(e) => updateFormField(index, 'type', e.target.value)}
              className="w-1/3 px-3 py-2 border border-gray-300 rounded-md mr-2"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="number">Number</option>
            </select>
            <input
              type="text"
              value={field.name}
              onChange={(e) => updateFormField(index, 'name', e.target.value)}
              placeholder="Name"
              className="w-1/3 px-3 py-2 border border-gray-300 rounded-md mr-2"
            />
            <button
              onClick={() => removeFormField(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addFormField}
          className="bg-green-500 text-white px-3 py-2 rounded-md mt-2"
        >
          Add Field
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Webhook URL
        </label>
        <input
          type="url"
          id="webhookUrl"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="widgetColor" className="block text-sm font-medium text-gray-700 mb-1">
          Widget Color
        </label>
        <div className="flex items-center">
          <input
            type="color"
            id="widgetColor"
            value={widgetColor}
            onChange={(e) => setWidgetColor(e.target.value)}
            className="w-10 h-10 mr-2"
          />
          <input
            type="text"
            value={widgetColor}
            onChange={(e) => setWidgetColor(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="buttonColor" className="block text-sm font-medium text-gray-700 mb-1">
          Send Referral Button Color
        </label>
        <div className="flex items-center">
          <input
            type="color"
            id="buttonColor"
            value={buttonColor}
            onChange={(e) => setButtonColor(e.target.value)}
            className="w-10 h-10 mr-2"
          />
          <input
            type="text"
            value={buttonColor}
            onChange={(e) => setButtonColor(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="border border-gray-300 p-4 rounded-lg">
          <Widget
            videoUrl={videoUrl}
            rewardsText={rewardsText}
            headerText={headerText}
            formFields={formFields}
            webhookUrl={webhookUrl}
            widgetColor={widgetColor}
            buttonColor={buttonColor}
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Embed Code</h2>
        <textarea
          ref={embedCodeRef}
          className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
          value={generateEmbedCode()}
          readOnly
        />
        <button
          onClick={copyEmbedCode}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Copy Embed Code
        </button>
      </div>
    </div>
  );
};

export default WidgetBuilder;
