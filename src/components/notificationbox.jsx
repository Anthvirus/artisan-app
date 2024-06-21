import { XMarkIcon } from '@heroicons/react/24/outline';

const Notification = ({ type, message, onClose }) => {
  const typeClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  return (
    <div className={`border-l-2 p-2 my-2 rounded-md shadow-md ${typeClasses[type]} relative`}>
      <div className="flex items-center justify-between">
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="ml-2">
          <XMarkIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
