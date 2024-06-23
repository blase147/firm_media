import axios from 'axios';

const ACCESS_TOKEN = 'process.env.INSTAGRAM-API-KEY';

export const fetchInstagramPosts = async () => {
  const URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${ACCESS_TOKEN}`;

  try {
    const response = await axios.get(URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram posts', error);
    return [];
  }
};

export default fetchInstagramPosts;