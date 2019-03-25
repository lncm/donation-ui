import React from 'react';
import tick from '../assets/images/tick.png';

const QRCodePaid = () => {
  return (
    <div id="qr-main">
      <img src={tick} alt="Invoice Paid" style={{ width: '400px', height: '400px', maxHeight: '400px' }} />
    </div>
  );
};

export default QRCodePaid;
