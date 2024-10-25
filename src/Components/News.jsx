import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import './News.css';

function News() {
    const location = useLocation();
    const { coin } = location.state || {};
    const [ohlcData, setOhlcData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);

    if (!coin) {
        return <div>No coin data available</div>;
    }

    useEffect(() => {
        const fetchOhlcData = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=30`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Transform the data to fit the chart format with shorter date
                const chartData = data.map(item => ({
                    name: new Date(item[0]).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }), // Short date format (MM/DD)
                    price: item[4], // Closing price is at index 4
                }));

                setOhlcData(chartData);
                setCurrentPrice(coin.current_price); // Set current price
            } catch (err) {
                setError('Failed to fetch OHLC data');
            } finally {
                setLoading(false);
            }
        };

        fetchOhlcData();
    }, [coin.id, coin.current_price]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="news-container">
            <div className="boxes-wrapper">
                <div className="coin-details-box">
                    <h3>Coin Details</h3>
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
                <div className="coin-chart-box">
                    <h3>Price Chart</h3>
                    <div className="coin-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={ohlcData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#2a2a2a', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#f7931a"
                                    strokeWidth={3}
                                    dot={{ stroke: '#f7931a', strokeWidth: 2 }}
                                    isAnimationActive={false}
                                />
                                {/* Current Price Marker */}
                                <ReferenceLine y={currentPrice} stroke="#ff0000" strokeDasharray="3 3" label="Current Price" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
