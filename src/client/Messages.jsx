import React, { useEffect, useState } from 'react';
import './app.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(res => {
        setMessages(res.messages || []);
      });
  }, []);

  const renderMessages = (messages) => {
    return messages.map((message) => (
      <tr>
        <td>{message.name}</td>
        <td>{message.email}</td>
        <td>{message.subject}</td>
        <td>{message.message}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className='container title'>
        Latest messages
      </div>
      <table className='simple-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          { messages.length ? renderMessages(messages) : (
            <tr>
              <td colSpan={4}>No messages found</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
