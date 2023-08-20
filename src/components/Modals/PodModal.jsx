import Modal from 'react-bootstrap/Modal';
import './podModal.scss';
import { useNavigate } from 'react-router';

function PodModal(props) {
const navigate = useNavigate()

  return (
    // <div className='MemberOnly'>
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
        <h4>Oops!</h4>
        <p>
          It seems you are trying to access a members only service.
          <br/>
          {/* Sign in to continue */}
        </p>
        {/* <p>
        Click the button below to sign in or create an account.
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide} >Sign In</Button> */}
        <button className='modal-btn'
        onClick={()=>{
          navigate('/login')
        }}
        >Sign In</button>
      </Modal.Footer>
    </Modal>
    // </div>
  );
}

export default PodModal

