// News.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import './News.css';
import ActualNews from './ActualNews';


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
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=7`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                const chartData = data.map(item => ({
                    name: new Date(item[0]).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
                    price: item[4],
                }));

                setOhlcData(chartData);
                setCurrentPrice(coin.current_price);
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

    const isPriceDropped = ohlcData.length > 1 && ohlcData[ohlcData.length - 1].price < ohlcData[0].price;
    const areaFillColor = isPriceDropped ? "#ff0000" : "#28a745";

    return (
        <div className="news-container">
            <div className="boxes-wrapper">
                <div className="coin-details-box">

                    <div className="coin-details">
                        <img src={coin.image} alt={coin.name} className="coin-image" />
                        <p className="detail-item">Symbol: <span>{coin.symbol.toUpperCase()}</span></p>
                        <p className="detail-item">Current Price: <span>${coin.current_price.toFixed(2)}</span></p>
                        <p className="detail-item">Market Cap: <span>${(coin.market_cap / 1e9).toFixed(2)}B</span></p>
                        <p className="detail-item">Volume (24h): <span>${(coin.total_volume / 1e9).toFixed(2)}B</span></p>
                        <p className="detail-item">Circulating Supply: <span>{(coin.circulating_supply / 1e6).toFixed(2)}M</span></p>
                        <p className="detail-item">Price Change (24h): <span>{coin.price_change_percentage_24h.toFixed(2)}%</span></p>
                    </div>
                </div>

                <div className="coin-chart-box">
                    <h3>Price Chart</h3>
                    <div className="coin-chart">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={ohlcData.slice(-7)}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={areaFillColor} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={areaFillColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                <XAxis dataKey="name" stroke="#fff" tickCount={7} />
                                <YAxis stroke="#fff" tickCount={6} domain={['auto', 'auto']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#2a2a2a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    labelStyle={{ color: '#f7931a' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#f7931a"
                                    fillOpacity={1}
                                    fill={`url(#colorPrice)`}
                                />
                                <ReferenceLine
                                    y={currentPrice}
                                    stroke="#ff0000"
                                    strokeDasharray="3 3"
                                    label="Current Price"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <ActualNews coinSymbol={coin.symbol} />
        </div>
    );
}

export default News;
