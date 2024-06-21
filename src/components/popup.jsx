export default function Popup({ show, onClose, children, HeaderText}){
  
  if (!show) {
    return null;
  }

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center w-auto h-auto bg-gray-600 bg-opacity-50" onClick={handlePopupClick}>
        <div className="relative z-10 w-auto h-auto p-8 bg-gray-200 rounded-lg shadow-md opacity-100" onClick={handlePopupClick}>
        <h2 className="text-3xl font-semibold">{HeaderText}</h2>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-2 text-5xl text-gray-400 hover:text-gray-800"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }