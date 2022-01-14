import React, { Component, useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';
import propTypes from "prop-types"

const modalRoot = document.getElementById('modal-root');

export default function Modal({src, alt, onClose}) {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    
    
    return ()=>{ window.removeEventListener('keydown', handleKeyDown)}   
      
  })

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
    return createPortal(
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  
}
Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired
}


// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { src, alt } = this.props;
//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackdropClick}>
//         <div className={s.modal}>
//           <img src={src} alt={alt} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
// Modal.propTypes = {
//   src: propTypes.string.isRequired,
//   alt: propTypes.string.isRequired
// }