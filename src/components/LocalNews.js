import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemList.css';

const LocalNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocalNews = async () => {
      try {
        const response = await axios.get('http://localhost:3002/local-news');
        setArticles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="blog-container">
      <h1 className="blog-title">Local News</h1>
      <div className="blog-grid">
        {articles.map((article, index) => (
          <div className="blog-card" key={index}>
            {/* Display the article image */}
            <img
              src={article.urlToImage || 'default-image-url.jpg'}
              alt={article.title}
              className="blog-image"
            />
            {/* Article metadata */}
            <div className="blog-meta">
              <span>{new Date(article.publishedAt || '2024-12-15').toLocaleDateString()}</span>
              <span>{article.source || 'Local Source'}</span>
            </div>
            {/* Article title */}
            <h2 className="blog-post-title">
              <a href={article.url || '#'} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>
            {/* Article description */}
            <p className="blog-description">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalNews;
