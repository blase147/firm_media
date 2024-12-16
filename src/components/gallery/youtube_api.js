import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCwr0jDqS6WW03baKcf5qJhg'; // or PLAYLIST_ID

export const fetchYouTubeVideos = async () => {
  const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`;
  console.log('YouTube API Key:', process.env.REACT_APP_YOUTUBE_API_KEY);

  try {
    const response = await axios.get(URL);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos', error);
    return [];
  }
};

export default fetchYouTubeVideos;
