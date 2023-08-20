import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function NetworkStatus(props) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [show, setShow] = useState(true);


    useEffect(() => {
      const handleOnlineStatus = () => {
        setIsOnline(navigator.onLine);
      };
  
      window.addEventListener('online', handleOnlineStatus);
      window.addEventListener('offline', handleOnlineStatus);
  
      return () => {
        window.removeEventListener('online', handleOnlineStatus);
        window.removeEventListener('offline', handleOnlineStatus);
      };
    }, []);
  
    return (
      <>
        <ToastContainer position="bottom-end" containerPosition	="fixed">
          {!isOnline ? (
            <Toast bg="danger">
              <Toast.Header>
                <strong className="me-auto">Offline</strong>
              </Toast.Header>
              <Toast.Body className={'text-white'}>
                You are currently offline. Please check your internet connection.
              </Toast.Body>
            </Toast>
          )
        :
        (
            <Toast bg="success"onClose={() => setShow(false)} show={show}  delay={500} autohide>
              <Toast.Header>
                <strong className="me-auto">Online</strong>
              </Toast.Header>
              <Toast.Body className={'text-white'}>
               You are back online
              </Toast.Body>
            </Toast>
          )}
        </ToastContainer>
        {/* rest of your component code */}
      </>
    );
}

export default NetworkStatus;

