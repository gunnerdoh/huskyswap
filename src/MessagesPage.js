import React from 'react';
import { useParams } from 'react-router-dom';
import MessagesList from './MessagesList';
import Conversation from './Conversation';
import Header from './Header';

const MessagesPage = () => {
  const { conversationId } = useParams();

  return (
    <div className="container-fluid">
          <Header />
      <h1 className="mb-4">Messages</h1>
      <div className="row">
        <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
          <div className="card">
            <div className="card-body">
              <MessagesList />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="card-body">
              {conversationId ? (
                <Conversation />
              ) : (
                <p className="text-center text-muted">Select a conversation to start chatting</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;