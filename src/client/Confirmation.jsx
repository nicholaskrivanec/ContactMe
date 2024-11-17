import React from 'react';
import SendSvg from '../../assets/send.svg';
import './app.css';

const Confirmation = ({ status, hide }) => {
  return (
    <div className="container message">
      {status ? (
        <div className="message-container text-center">
          <div className="image">
            <img src={SendSvg} className="send-icon" alt="send icon" />
          </div>
          <div className="text">
            <h2 className="bold margin-0">Thank you!</h2>
            <p className="margin-0">Your message was sent</p>
          </div>
          <button onClick={() => { hide(); }} className="close-button">Close</button>
        </div>
      ) : ('Failed to send your message.')}
    </div>
  );
};

export default Confirmation;
