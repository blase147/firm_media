import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

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

        setPosts(feed.items);
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
    <div id="medium-posts" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Medium Posts</h2>
      <div
        className="medium-feed"
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',
        }}
      >
        {posts.length === 0 && <p>No posts to display</p>}
        {posts.map((post) => (
          <div
            key={post.guid}
            className="medium-post"
            style={{
              border: '1px solid #ddd', padding: '10px', width: 'calc(33% - 40px)', boxSizing: 'border-box',
            }}
          >
            <img src={extractImageFromContent(post['content:encoded'] || post.content)} alt={post.title} style={{ maxWidth: '100%' }} />
            <p><em>{formatDate(post.pubDate)}</em></p>
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
