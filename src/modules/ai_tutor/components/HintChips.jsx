import { Lightbulb } from 'lucide-react';

/**
 * HintChips - Display suggested hints for scaffolding
 * @param {Object} props
 * @param {Array<string>} props.hints - Array of hint strings
 * @param {Function} props.onHintClick - Callback when hint is clicked
 * @param {boolean} props.show - Whether to show hints
 */
const HintChips = ({ hints = [], onHintClick, show = true }) => {
  if (!show || hints.length === 0) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-4">
      <div className="flex items-center space-x-2 mb-2">
        <Lightbulb size={16} className="text-yellow-600" />
        <p className="text-sm font-medium text-yellow-800">Need help? Try these:</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {hints.map((hint, index) => (
          <button
            key={index}
            onClick={() => onHintClick?.(hint)}
            className="
              px-3 py-1.5 bg-white border border-yellow-300 rounded-full
              text-sm text-gray-700 hover:bg-yellow-100 hover:border-yellow-400
              transition-all duration-200 shadow-sm hover:shadow
            "
          >
            {hint}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HintChips;
