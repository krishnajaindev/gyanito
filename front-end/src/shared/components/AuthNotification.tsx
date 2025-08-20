import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface AuthNotificationProps {
  type: 'success' | 'error' | 'info' | '';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

/**
 * A reusable notification component for authentication actions
 * Displays success, error, or info messages with appropriate styling
 */
const AuthNotification: React.FC<AuthNotificationProps> = ({
  type = 'info',
  message,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}) => {
  // Auto-close the notification after specified time
  React.useEffect(() => {
    if (autoClose && message) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, message, onClose]);

  if (!message) return null;

  // Determine styles based on notification type
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case '':
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  // Determine icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case '':
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div
      className={`p-4 mb-4 rounded-md border ${getStyles()} flex items-center justify-between transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <div className="flex items-center">
        {getIcon()}
        <span className="ml-2">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default AuthNotification;