// components/ActionButton.tsx
import React from 'react';

interface ActionButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  isDisabled: boolean;
  handleAction: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, count, isActive, isDisabled, handleAction }) => {
  return (
    <button 
      onClick={handleAction}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-md transition-colors ${
        isActive 
          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
          : 'bg-gray-300 text-gray-700'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {label} ({count})
    </button>
  );
};

export default ActionButton;
