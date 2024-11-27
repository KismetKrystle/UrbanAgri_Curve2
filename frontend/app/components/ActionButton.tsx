import React from 'react';

interface ActionButtonProps {
  label: string;
  count?: number;
  isActive: boolean;
  isDisabled: boolean;
  handleAction: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  count,
  isActive,
  isDisabled,
  handleAction
}) => {
  const backgroundColor = isActive
    ? 'bg-button-voted hover:bg-button-clear-vote'
    : 'bg-button-default hover:bg-button-cast-vote';
  const cursor = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`action-button ${backgroundColor} ${cursor}`}
      onClick={handleAction}
      disabled={isDisabled}
    >
      {label}
      {count !== undefined && `: ${count}`}
    </button>
  );
};

export default ActionButton;
