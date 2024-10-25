import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './News.css'; // Add this line to import the CSS

function News() {
    const location = useLocation();
    const { coin } = location.state || {};

    if (!coin) {
        return <div>No coin data available</div>;
    }

    return (
        <div className="news-container">
            <h2>{coin.name} Details</h2>
            <div className="coin-details">
                <img src={coin.image} alt={coin.name} />
                <p>Symbol: {coin.symbol.toUpperCase()}</p>
                <p>Current Price: ${coin.current_price.toFixed(2)}</p>
                <p>Market Cap: ${(coin.market_cap / 1e9).toFixed(2)}B</p>
                <p>Volume (24h): ${(coin.total_volume / 1e9).toFixed(2)}B</p>
                <p>Circulating Supply: {(coin.circulating_supply / 1e6).toFixed(2)}M</p>
                <p>Price Change (24h): {coin.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
        </div>
    );
}

export default News;
