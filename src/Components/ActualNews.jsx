import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ActualNews.css';

const ActualNews = () => {
    const location = useLocation();
    const { coin } = location.state || {};
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState({});
    const API_URL = `https://cryptopanic.com/api/free/v1/posts/`;
    const AUTH_TOKEN = '3c5f64f254c23f3e93e3502ca0d8b3b796be6733';

    useEffect(() => {
        if (coin) {
            const fetchNews = async () => {
                try {
                    const response = await fetch(`${API_URL}?auth_token=${AUTH_TOKEN}&currencies=${coin.symbol.toLowerCase()}&public=true`);
                    if (!response.ok) throw new Error('Failed to fetch news');
                    const data = await response.json();
                    setNews(data.results);
                    // Initialize votes
                    const initialVotes = {};
                    data.results.forEach(article => {
                        initialVotes[article.id] = { up: 0, down: 0 };
                    });
                    setVotes(initialVotes);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchNews();
        }
    }, [coin]);

    const handleArticleClick = (article, event) => {
        // Prevent article click when clicking on voting buttons
        if (event.target.closest('.voting-buttons')) return;

        if (article.url) {
            window.open(article.url, '_blank', 'noopener noreferrer');
        }
    };

    const handleVote = (articleId, voteType) => {
        setVotes(prev => ({
            ...prev,
            [articleId]: {
                ...prev[articleId],
                [voteType]: prev[articleId][voteType] + 1
            }
        }));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-skeleton">
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                    <div className="skeleton-item"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <p>⚠️ {error}</p>
            </div>
        );
    }

    return (
        <div className="news-section">
            <div className="news-header">
                <h2>Latest {coin?.name} News</h2>
                <p className="subtitle">Stay updated with the latest cryptocurrency news and trends</p>
            </div>

            <div className="news-grid">
                {news.length > 0 ? (
                    news.map((article) => (
                        <div
                            key={article.id}
                            className="news-article"
                            onClick={(e) => handleArticleClick(article, e)}
                        >
                            <div className="article-content">
                                <h3>{article.title}</h3>

                                <div className="article-metadata">
                                    <div className="metadata-item">
                                        🌐 <span>{article.source.title}</span>
                                    </div>
                                    <div className="metadata-item">
                                        🕒 <span>{new Date(article.published_at).toLocaleString()}</span>
                                    </div>
                                    <div className="metadata-item">
                                        🔗 <span>{article.domain}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hover-line"></div>
                        </div>
                    ))
                ) : (
                    <div className="no-news">
                        <p>No news available for {coin?.name}. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActualNews;