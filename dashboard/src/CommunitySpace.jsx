import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatRoom from './ChatRoom';
import VideoHub from './VideoHub';

const CommunitySpace = () => {
  const activeTab = useSelector(state => state.community.activeTab);
  const dispatch = useDispatch();

  return (
    <div className="community-space">
      <div className="tabs">
        <button onClick={() => dispatch(setActiveTab('chat'))}>Chat</button>
        <button onClick={() => dispatch(setActiveTab('videos'))}>Videos</button>
      </div>
      
      {activeTab === 'chat' ? <ChatRoom /> : <VideoHub />}
    </div>
  );
};

export default CommunitySpace;