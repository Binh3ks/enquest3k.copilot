import React from 'react';
const RichText = ({ text, className = "" }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <span key={index} className="font-bold text-indigo-700">{part.slice(2, -2)}</span>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
export default RichText;
