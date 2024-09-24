import React from 'react';

const Message = ({ message, currentUser, otherUser }) => {
  const isCurrentUser = message.senderId === currentUser.uid;
  const senderName = isCurrentUser ? 'You' : (otherUser ? otherUser.name : 'Other User');

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
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span className="text-muted" style={{width: '20%'}}>{senderName}</span>
      <span className="text-dark" style={{width: '60%'}}>{message.content}</span>
      <span className="text-muted text-end" style={{width: '20%'}}>{formatTime(message.timestamp)}</span>
    </div>
  );
};

export default Message;