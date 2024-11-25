import React from 'react'
import '../../styles/spinner.css'
function SpinnerComponent() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
      <div className="spinner"></div>
    </div>
  );
};
export default SpinnerComponent