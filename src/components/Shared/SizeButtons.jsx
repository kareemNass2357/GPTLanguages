import React from 'react';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon from Material-UI
import RemoveIcon from '@mui/icons-material/Remove'; // Import the Remove icon from Material-UI

const SizeButton = ({ onClick, icon }) => (
  <button onClick={onClick} className="size-btn px-1 py-1 !bg-gray-300 rounded w-6 h-6 flex items-center justify-center text-sm">
    {icon}
  </button>
);
/**
 * SizeButtons component
 * 
 * Props: 
 * - fontSize: The current font size
 * - setFontSize: Function to update the font size
 * - nightMode: Boolean indicating if night mode is enabled
 * 
 * Usage:
 * 
 * <SizeButtons fontSize={fontSize} setFontSize={setFontSize} nightMode={nightMode} />
 * 
 * Ensure that the `fontSize` and `setFontSize` functions are defined in the parent component
 * and update the shared state for font size. This way, changes in one component will reflect in the other.
 */
const SizeButtons = ({ fontSize, setFontSize, nightMode }) => {
  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
  };

  return (
    <button className={`flex items-center rounded shadow px-4 py-2 ${nightMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-green-600 text-white hover:bg-green-700'}`} style={{ boxShadow: '0 6px 0 rgba(0, 0, 0, 0.2)' }}>
      <span className="mr-2">Font</span>
      <div className="flex gap-1">
        <SizeButton onClick={decreaseFontSize} icon={<RemoveIcon />} />
        <SizeButton onClick={increaseFontSize} icon={<AddIcon />} />
      </div>
    </button>
  );
};

export default SizeButtons;
