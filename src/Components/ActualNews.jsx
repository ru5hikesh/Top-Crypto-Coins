import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ActualNews.css';

const ActualNews = () => {
    const location = useLocation();
    const { coin } = location.state || {}; // Get the selected coin data from location state
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = `https://cryptopanic.com/api/free/v1/posts/`;
    const AUTH_TOKEN = '3c5f64f254c23f3e93e3502ca0d8b3b796be6733';

    useEffect(() => {
        if (coin) {
            const fetchNews = async () => {
                try {
                    const response = await axios.get(API_URL, {
                        params: {
                            auth_token: AUTH_TOKEN,
                            currencies: coin.symbol.toLowerCase(), // Use the coin symbol for fetching news
                            public: true
                        }
                    });
                    console.log(response.data.results); // Log the response to check the structure
                    setNews(response.data.results);
                } catch (error) {
                    console.error('Error fetching news:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchNews();
        }
    }, [coin]);

    const handleArticleClick = (article) => {
        // Check if the original source URL is available
        const originalUrl = article.url; // Adjust this line based on the API response structure
        if (originalUrl) {
            window.open(originalUrl, '_blank'); // Open the actual article link in a new tab
        } else {
            console.error('Original article URL not found:', article); // Log an error if URL is not found
        }
    };

    if (loading) {
        return <p>Loading news...</p>;
    }

    return (
        <div className="news-section">
            <h2>Latest News on {coin?.name}</h2>
            {news.length > 0 ? (
                news.map((article) => (
                    <div
                        key={article.id}
                        className="news-article"
                        onClick={() => handleArticleClick(article)} // Call the click handler with the article
                    >
                        <h3>{article.title}</h3>
                        <p>Source: {article.source.title}</p>
                        <p>Published at: {new Date(article.published_at).toLocaleString()}</p>
                        <p>Domain: {article.domain}</p>
                    </div>
                ))
            ) : (
                <p>No news available for this coin.</p>
            )}
        </div>
    );
};

export default ActualNews;
