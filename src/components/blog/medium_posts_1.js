import React, { useEffect, useState } from 'react';
import './blog.scss';
import Parser from 'rss-parser';
import dateIcon from '../images/png/Calendar.png';

const MediumPosts = () => {
  const [posts, setPosts] = useState([]);
  const rssUrl = 'http://localhost:5000/fetch-medium-posts';

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const parser = new Parser();
        const response = await fetch(rssUrl);
        const responseText = await response.text();
        const feed = await parser.parseString(responseText);

        console.log('Feed items:', feed.items);

        // Limit to the first post only
        const limitedPosts = feed.items.slice(0, 1);

        setPosts(limitedPosts);
      } catch (error) {
        console.error('Error fetching Medium posts:', error);
      }
    };

    fetchMediumPosts();
  }, []);

  const extractImageFromContent = (content) => {
    if (!content) {
      console.log('No content found');
      return 'https://via.placeholder.com/150';
    }

    console.log('Post content:', content);

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const img = doc.querySelector('img');
      const imgUrl = img ? img.src : 'https://via.placeholder.com/150';

      console.log('Extracted image URL:', imgUrl);
      return imgUrl;
    } catch (error) {
      console.error('Error parsing content for images:', error);
      return 'https://via.placeholder.com/150';
    }
  };

  const createSnippet = (content, length = 100) => {
    if (!content) return '';
    const textContent = content.replace(/<[^>]*>?/gm, ''); // Strip HTML tags
    return textContent.length > length ? `${textContent.substring(0, length)}...` : textContent;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div>
        {posts.length === 0 && <p>No posts to display</p>}
        {posts.map((post) => (
          <div
            key={post.guid}
            id="blog_card"
          >
            <img src={extractImageFromContent(post['content:encoded'] || post.content)} alt={post.title} style={{ maxWidth: '100%' }} />
            <div className="date_icon">
              <img src={dateIcon} alt="date_icon" />
              <p><em>{formatDate(post.pubDate)}</em></p>
            </div>
            <h3>{post.title}</h3>
            <p>{post.contentSnippet || createSnippet(post['content:encoded'] || post.content)}</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer">Read More on Medium</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediumPosts;
