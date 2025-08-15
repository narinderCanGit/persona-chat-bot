import React from 'react';

const dotStyle = {
  display: 'inline-block',
  width: 8,
  height: 8,
  margin: '0 2px',
  borderRadius: '50%',
  background: '#25d366',
  animation: 'typing-bounce 1.2s infinite both',
};

const TypingIndicator = () => (
  <div style={{ display: 'flex', alignItems: 'center', height: 24 }}>
    <span style={{ ...dotStyle, animationDelay: '0s' }} />
    <span style={{ ...dotStyle, animationDelay: '0.2s' }} />
    <span style={{ ...dotStyle, animationDelay: '0.4s' }} />
    <style>
      {`
        @keyframes typing-bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.7; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}
    </style>
  </div>
);

export default TypingIndicator;