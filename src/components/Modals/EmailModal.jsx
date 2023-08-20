import Modal from 'react-bootstrap/Modal';
import './podModal.scss';
import { useNavigate } from 'react-router';

function EmailModal(props) {
const navigate = useNavigate()

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
         {/* <Modal.Title id="contained-modal-title-vcenter">
         Oops!
        </Modal.Title>  */}
      </Modal.Header >
      <Modal.Body closeButton>
        <h4>Order Recieved</h4>
        <p>
            An Email has been sent to you containing your order details. 
          <br/>
          {/* Sign in to continue */}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className='modal-btn'
        onClick={()=>{
          navigate('/')
        }}
        >Back to home</button>
      </Modal.Footer>
    </Modal>

  );
}

export default EmailModal

