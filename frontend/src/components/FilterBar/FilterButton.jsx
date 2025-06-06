
import React from 'react';

const FilterButton = ({ 
  onClick, 
  isSelected, 
  children,
  type = 'default'
}) => {
  const baseClasses = "px-3 py-1.5 rounded-md text-sm font-medium transition-colors";
  
  const typeClasses = {
    default: "border border-gray-300",
    state: "border border-gray-300 font-medium",
    tag: "border border-gray-300"
  };
  
  const selectedClasses = isSelected 
    ? "bg-indigo-500 text-white border-blue-500" 
    : "bg-white text-gray-700 hover:bg-gray-100";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${typeClasses[type]} ${selectedClasses}`}
    >
      {children}
    </button>
  );
};

export default FilterButton;