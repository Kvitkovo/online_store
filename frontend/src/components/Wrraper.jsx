import React from 'react';

const Wrapper = ({ children }) => {
  const wrapperStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  };

  const containerStyle = {
    width: '1180px',
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>{children}</div>
    </div>
  );
};

export default Wrapper;
