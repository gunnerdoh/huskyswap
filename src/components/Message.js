import React from 'react';
import '../styles/Message.css';

const Message = ({ message, currentUser, otherUser }) => {
  const isCurrentUser = message.senderId === currentUser.uid;
  const senderName = isCurrentUser ? 'You' : (otherUser ? otherUser.name : 'Other User');
  const messageClass = isCurrentUser ? 'message current-user' : 'message other-user';

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    let date;
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else {
      return '';
    }

    const now = new Date();
    const diff = now - date;
    const isWithin12Hours = diff < 12 * 60 * 60 * 1000;

    if (isWithin12Hours) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className={`${messageClass} mb-2`}>
      <div className="message-content">
        <p>{message.content}</p>
      </div>
      <div className="message-info">
        <span className="sender-name pe-2">{senderName} </span>
        <span className="message-time"> {formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;