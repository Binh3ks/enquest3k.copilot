import { CloudUpload, CheckCircle } from 'lucide-react';

/**
 * AutoSaveIndicator Component - Header indicator for auto-save status
 * Master Prompt V23 Section 0.1.1.C
 * 
 * States:
 * - idle: Hidden (display: none)
 * - saving: CloudUpload icon spinning + "Saving..." text
 * - saved: CheckCircle icon + "Saved" text (fades out after 1s)
 * 
 * Location: Header, next to user profile icon
 */
export default function AutoSaveIndicator({ status }) {
  if (!status || status === 'idle') return null;

  const config = {
    saving: {
      icon: CloudUpload,
      text: 'Saving...',
      iconClass: 'animate-spin',
      textClass: 'text-blue-600'
    },
    saved: {
      icon: CheckCircle,
      text: 'Saved',
      iconClass: '',
      textClass: 'text-green-600'
    }
  };

  const { icon: Icon, text, iconClass, textClass } = config[status] || config.saving;

  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg
        bg-white/80 backdrop-blur-sm border border-gray-200
        transition-all duration-300
        ${status === 'saved' ? 'animate-fadeOut' : ''}
      `}
      role="status"
      aria-live="polite"
    >
      <Icon className={`w-4 h-4 ${textClass} ${iconClass}`} />
      <span className={`text-sm font-medium ${textClass}`}>{text}</span>
    </div>
  );
}
