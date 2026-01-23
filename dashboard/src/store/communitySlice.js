import { createSlice } from '@reduxjs/toolkit';

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    activeTab: 'chat',
    messages: [],
    videos: []
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addVideo: (state, action) => {
      state.videos.push(action.payload);
    }
  }
});

export const { setActiveTab, addMessage, addVideo } = communitySlice.actions;
export default communitySlice.reducer;