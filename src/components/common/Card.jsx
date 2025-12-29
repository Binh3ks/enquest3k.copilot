import React from 'react';

const Card = ({ title, subtitle, className = '', children, icon: Icon, action }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-200 hover:shadow-md ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-slate-50 bg-white flex justify-between items-start">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                {Icon && <Icon className="w-5 h-5 mr-2 text-indigo-500" />}
                {title}
              </h3>
            )}
            {subtitle && <div className="text-sm text-slate-500 mt-0.5">{subtitle}</div>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
export default Card;
