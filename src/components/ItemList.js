import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemList.css';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=86f34fbbc3974344882070d91ed9053b'
        );

        const filteredArticles = response.data.articles.filter(
          (article) => article.urlToImage && article.urlToImage.trim() !== ''
        );

        setArticles(filteredArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching news: {error}</div>;

  return (
    <div className="blog-container">
      <h1 className="blog-title">CMFP PRESS</h1>
      <div className="blog-grid">
        {currentArticles.map((article, index) => (
          <div className="blog-card" key={index}>
            <img
              src={article.urlToImage}
              alt={article.title}
              className="blog-image"
            />
            <div className="blog-meta">
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              <span>{article.source.name}</span>
            </div>
            <h2 className="blog-post-title">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>
            <p className="blog-description">{article.description}</p>
          </div>
        ))}
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articles.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ articlesPerPage, totalArticles, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination-button ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default NewsList;
