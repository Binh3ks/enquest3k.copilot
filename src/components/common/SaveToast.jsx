import { useEffect, useState } from 'react';
import { CheckCircle, CloudUpload } from 'lucide-react';

/**
 * SaveToast Component - Shows save status notifications
 * Master Prompt V23 Section 0.1.1.A
 * 
 * States:
 * - 'saving': CloudUpload icon + "Saving progress..." (blue background)
 * - 'success': CheckCircle icon + "Progress saved!" (green background)
 * 
 * Auto-dismisses after 2 seconds in success state
 */
export default function SaveToast({ status, onDismiss }) {
  const [isVisible, setIsVisible] = useState(!!status);

  useEffect(() => {
    // Sync visibility with status prop
    if (status) {
      // Use setTimeout to avoid setState during render
      const showTimer = setTimeout(() => setIsVisible(true), 0);
      
      // Auto-dismiss after 2s if success
      if (status === 'success') {
        const dismissTimer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onDismiss?.(), 300); // Wait for fade animation
        }, 2000);
        return () => {
          clearTimeout(showTimer);
          clearTimeout(dismissTimer);
        };
      }
      return () => clearTimeout(showTimer);
    } else {
      setIsVisible(false);
    }
  }, [status, onDismiss]);

  if (!status) return null;

  const config = {
    saving: {
      icon: CloudUpload,
      text: 'Saving progress...',
      bgColor: 'bg-blue-500',
      iconClass: 'animate-pulse'
    },
    success: {
      icon: CheckCircle,
      text: 'Progress saved!',
      bgColor: 'bg-green-500',
      iconClass: ''
    }
  };

  const { icon: Icon, text, bgColor, iconClass } = config[status] || config.saving;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl
        ${bgColor} text-white
        transition-all duration-300 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`w-6 h-6 ${iconClass}`} />
      <span className="font-medium text-base">{text}</span>
    </div>
  );
}
