// src/components/MediumPosts.js

import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

const MediumPosts = () => {
  const [posts, setPosts] = useState([]);
  const rssUrl = 'https://medium.com/feed/@solarmails2';

  useEffect(() => {
    const fetchMediumPosts = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL(rssUrl);
      setPosts(feed.items);
    };

    fetchMediumPosts();
  }, []);

  const extractImageFromContent = (content) => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const matches = regex.exec(content);
    return matches ? matches[1] : 'https://via.placeholder.com/150';
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
        {' '}
        {/* Show message if no posts */}
        {posts.map((post) => (
          <div
            key={post.guid}
            className="medium-post"
            style={{
              border: '1px solid #ddd', padding: '10px', width: 'calc(33% - 40px)', boxSizing: 'border-box',
            }}
          >
            <h3>{post.title}</h3>
            <img src={extractImageFromContent(post.content)} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />
            <p>{post.contentSnippet}</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer">Read More on Medium</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediumPosts;
