import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVideo } from './store/communitySlice';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const VideoHub = () => {
  const videos = useSelector(state => state.community.videos);
  const [videoUrl, setVideoUrl] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('new video', (video) => {
      dispatch(addVideo(video));
    });

    return () => { socket.off('new video'); };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoUrl.trim() && ReactPlayer.canPlay(videoUrl)) {
      const newVideo = {
        url: videoUrl,
        timestamp: new Date().toISOString()
      };
      socket.emit('new video', newVideo);
      setVideoUrl('');
    }
  };

  return (
    <div className="video-hub">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube/Vimeo URL"
        />
        <button type="submit">Add Video</button>
      </form>
      
      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <ReactPlayer
              url={video.url}
              width="100%"
              height="auto"
              controls={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoHub;