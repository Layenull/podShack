import Modal from 'react-bootstrap/Modal';
import './podModal.scss';
import { useNavigate } from 'react-router';

function DeleteModal(props) {
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
      </Modal.Header >
      <Modal.Body closeButton>
        <h4>Delete?</h4>
        <p>
          Do you want to delete this item.
          <br/>
          {/* Sign in to continue */}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide} >Sign In</Button> */}
        <button className='modal-btn-outline'
        onClick={props.onHide}
        ><span>Cancel</span></button>
        <button className='modal-delete'
        onClick={props.onDelete}
        >Delete</button>   
      </Modal.Footer>
    </Modal>
    // </div>
  );
}

export default DeleteModal

