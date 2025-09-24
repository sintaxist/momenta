import { useState, useRef } from 'react';

export const Tooltip = ({ children, content, keys = [], position = 'right', showBackground = true }) => {
  const [show, setShow] = useState(false);
  const showTimeout = useRef(null);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    showTimeout.current = setTimeout(() => {
      setShow(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(showTimeout.current);
    setShow(false);
  };

  const getStyledContent = () => {
    const parts = content.split(' ');
    const elements = [];
    parts.forEach((part, index) => {
      const trimmedPart = part.trim();
      const isKey = keys.includes(trimmedPart);
      if (isKey) {
        elements.push(
          <span key={index} className="px-2 py-1 border border-gray-600 rounded-md bg-gray-800 text-xs text-white shadow-sm flex items-center justify-center flex-shrink-0 min-w-[1.5rem] min-h-[1.5rem] cursor-pointer">
            {trimmedPart}
          </span>
        );
      } else if (trimmedPart === '+') {
        elements.push(<span key={index} className="mx-1 text-gray-400 font-bold">+</span>);
      } else if (trimmedPart !== '') {
        elements.push(<span key={index} className="flex-shrink-0 whitespace-nowrap">{part}</span>);
      }
    });
    return elements;
  };

  const getTooltipPosition = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'right':
      default:
        return '-right-2 transform translate-x-full top-1/2 -translate-y-1/2';
    }
  };

  const getArrowPosition = () => {
    switch (position) {
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45';
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45';
      case 'right':
      default:
        return 'left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45';
    }
  };

  return (
    <div className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setShow(false)}>
      {children}
      {show && (
        <div 
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-800 rounded-md shadow-lg flex items-center space-x-1 animate-fadeIn ${getTooltipPosition()}`}
        >
          {getStyledContent()}
          <div className={`absolute w-2 h-2 bg-gray-800 ${getArrowPosition()}`}></div>
        </div>
      )}
    </div>
  );
};