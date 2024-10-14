import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import WidgetPopup from './WidgetPopup';

interface WidgetProps {
  videoUrl: string;
  rewardsText: string;
  headerText: string;
  formFields: { label: string; type: string; name: string }[];
  webhookUrl: string;
  widgetColor: string;
  buttonColor: string;
}

const Widget: React.FC<WidgetProps> = ({
  videoUrl,
  rewardsText,
  headerText,
  formFields,
  webhookUrl,
  widgetColor,
  buttonColor
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleWidget}
        className={`fixed bottom-4 left-4 z-50 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300 ${
          !isOpen ? 'animate-pulse' : ''
        }`}
        style={{ backgroundColor: widgetColor }}
        aria-label="Open widget"
      >
        <Gift size={24} />
      </button>
      {isOpen && (
        <WidgetPopup
          videoUrl={videoUrl}
          rewardsText={rewardsText}
          headerText={headerText}
          formFields={formFields}
          webhookUrl={webhookUrl}
          buttonColor={buttonColor}
          onClose={toggleWidget}
        />
      )}
    </>
  );
};

export default Widget;