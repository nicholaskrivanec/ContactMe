import React, { useState } from 'react';
import Confirmation from './Confirmation';
import EnvelopeSvg from '../../assets/envelope.svg';
import './app.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState([]);
  const sendMessage = () => {
    const body = JSON.stringify({ name, email, subject, message });
    const headers = {
      'Content-Type': 'application/json'
    }

    const rgx = /.+@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const tempErrors = [];
    if (!name.length) tempErrors.push('Name input is required.');
    if (!email.length) {
      tempErrors.push('Email input is required.');
    } else if (!email.match(rgx)) {
      tempErrors.push(`'${email}' is not a valid email.`);
    }
    if (!subject.length) tempErrors.push('Subject input is required.');
    if (!message.length) tempErrors.push('Message input is required.');
    setErrors(tempErrors);

    if (!tempErrors.length) {
      fetch('/api/message', { method: 'POST', body, headers })
        .then(res => {
          setStatus(res.status === 201)
          setShowStatus(true);
        });
    }
  };

  const hideConfirmation = () => {
    setShowStatus(false);
  };

  return (
    <div className="container">
      {!showStatus && (
        <>
          <h2 className="text-center">
            <img src={EnvelopeSvg} alt="envelope icon" />
            New Message
          </h2>
          <form>
            <label>
              <span className="bold">Name</span>
              <input type="text" onChange={({ target }) => setName(target.value)} placeholder="your name.." />
            </label>

            <label>
              <span className="bold">Email</span>
              <input type="email" onChange={({ target }) => setEmail(target.value)} placeholder="your email.." />
            </label>

            <label>
              <span className="bold">Subject</span>
              <input type="text" onChange={({ target }) => setSubject(target.value)} placeholder="provide a subject.." />
            </label>

            <label>
              <span className="bold">Message</span>
              <textarea onChange={({ target }) => setMessage(target.value)} placeholder="Write something.." style={{ minHeight: '250px' }}></textarea>
            </label>

            <button className="button" onClick={sendMessage} type="button">Send</button>
          </form>
          <>{errors.map((e, i) => <p key={'error-'+i} className="error">{e}</p>)}</>
        </>
      )}
      {showStatus && (<Confirmation status={status} hide={hideConfirmation} />)}
    </div>
  );
};

export default ContactForm;
