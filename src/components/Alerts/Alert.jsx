import Alert from 'react-bootstrap/Alert';

function MyAlert({content}) {
  return (
    <Alert variant="success">
      <p style={{margin:0, textAlign:'center'}}>
        {content}
      </p>
 
    
    </Alert>
  );
}

export default MyAlert;