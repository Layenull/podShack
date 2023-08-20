import React from 'react';
import Modal from 'react-bootstrap/Modal';

function NotificationModal(props) {
    return (
        <Modal
      {...props}
      size="md"
      aria-labelledby={`contained-modal-title-vcenter${props.id}`}
      centered
    >
      <Modal.Header closeButton>
        <h3>  {props.title}</h3>
      </Modal.Header >
     <Modal.Body  >
        {/* <h4></h4> */}
        <p>
         {props.message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide} >Sign In</Button> */}
        <button className='modal-btn-outline'
        onClick={props.onHide}
        ><span>close</span></button>  
      </Modal.Footer>
    </Modal>
    );
}

export default NotificationModal;