import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ConversationList from '../components/ConversationsList';
import Conversation from '../components/Conversation';
import Header from '../components/Header';
import '../styles/ConversationsPage.css';
import '../styles/Universal.css';

const ConversationsPage = () => {
  const { conversationId } = useParams();
  const [showList, setShowList] = useState(!conversationId);

  const handleConversationSelect = () => {
    setShowList(false);
  };

  return (
    <div className="conversations-page">
      <Header />
      <div className="conversations-container">
        <div className={`conversation-list-container ${showList ? 'show' : 'hide'}`}>
          <ConversationList onSelectConversation={handleConversationSelect} />
        </div>
        <div className={`conversation-container ${!showList ? 'show' : 'hide'}`}>
          {conversationId ? (
            <Conversation />
          ) : (
            <div className="no-conversation-selected">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;