import React from 'react';
import Loader from 'react-loader-spinner';

const style = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  zIndex: '1200',
};

export default function ImageGalleryPendingView() {
  return (
    <div style={style}>
      <Loader type="Bars" color="#3f51b5" height={80} width={80} />
    </div>
  );
}
