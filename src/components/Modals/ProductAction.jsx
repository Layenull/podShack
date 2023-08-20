import Modal from 'react-bootstrap/Modal';
import './podModal.scss';
import { useNavigate } from 'react-router';

function ProductAction(props) {
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
        <h4>Added!</h4>
        <p>
          Item has been added to <span>{props.name}</span>.
          <br/>
          {/* Sign in to continue */}
        </p>
        {/* <p>
        Click the button below to sign in or create an account.
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide} >Sign In</Button> */}
        <button className='modal-btn-outline'
        onClick={()=>{
            navigate(`/${props.name}`)
        }}
        ><span>{props.name}</span></button>
        <button className='modal-btn'
        onClick={props.onHide}
        >Continue Shopping</button>
      
      </Modal.Footer>
    </Modal>
    // </div>
  );
}

export default ProductAction

