import axios from 'axios';

const API_KEY = 'AIzaSyCAwe-WZ0W_r5Pk58d28GxCQFGlWhwohXs';
const CHANNEL_ID = 'UCXq1MkTRXF0T_Ugs-YJwLgg'; // or PLAYLIST_ID

export const fetchYouTubeVideos = async () => {
  const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`;

  try {
    const response = await axios.get(URL);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos', error);
    return [];
  }
};

export default fetchYouTubeVideos;
