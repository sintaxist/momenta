import { useEffect, useRef } from 'react';

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (backdropRef.current && backdropRef.current === e.target) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'scale-100' : 'scale-95'}`}
      >
        {children}
      </div>
    </div>
  );
};