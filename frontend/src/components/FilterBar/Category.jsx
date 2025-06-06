
import React from 'react';

const Category = ({ title, icon, children }) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="ml-2 font-semibold text-gray-100">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
};

export default Category;