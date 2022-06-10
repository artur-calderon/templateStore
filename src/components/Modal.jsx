import React from 'react';
import './Modal.css'


function Modal(props) {
  return (
    <div className='modalBG'>
      <div className='modalContainer'>
        <div className='closeButton' onClick={() => props.closer(false)}>X</div>
        {props.children}
      </div>
    </div >
  );
}

export default Modal;