import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Coins() {
    const [coins, setCoins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';

        fetch(`${apiUrl}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then((res) => res.json())
            .then((data) => setCoins(data || []))
            .catch((err) => console.error(err));
    }, []);

    const handleCoinClick = (coin) => {
        navigate('/news', { state: { coin } }); // Pass the selected coin data
    };

    return (
        <div className="coins-container">
            <h2 className="title">Today's Cryptocurrency Prices by Market Cap</h2>
            <div className="coins-table">
                <div className="coins-header">
                    <div className="coin-row">
                        <div className="coin-cell">#</div>
                        <div className="coin-cell">Name</div>
                        <div className="coin-cell">Price</div>
                        <div className="coin-cell">24h %</div>
                        <div className="coin-cell">Market Cap</div>
                        <div className="coin-cell">Volume(24h)</div>
                        <div className="coin-cell">Circulating Supply</div>
                    </div>
                </div>
                <div className="coins-body">
                    {coins.map((coin, index) => (
                        <div className="coin-row" key={coin.id} onClick={() => handleCoinClick(coin)}>
                            <div className="coin-cell">{index + 1}</div>
                            <div className="coin-cell coin-name">
                                <img src={coin.image} alt={coin.name} />
                                <span>{coin.name}</span>
                            </div>
                            <div className="coin-cell">${coin.current_price.toFixed(2)}</div>
                            <div className={`coin-cell ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                            <div className="coin-cell">${(coin.market_cap / 1e9).toFixed(2)}B</div>
                            <div className="coin-cell">${(coin.total_volume / 1e9).toFixed(2)}B</div>
                            <div className="coin-cell">{(coin.circulating_supply / 1e6).toFixed(2)}M {coin.symbol.toUpperCase()}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">
                <p><span>© made with </span>
                    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beating%20Heart.png" alt="Beating heart" />
                    <span> by </span>
                    <a href="https://github.com/ru5hikesh" target="_blank" rel="noopener noreferrer">ru5hikesh</a>
                    <span> : for learning purpose </span>
                </p>
            </div>
        </div>
    );
}

export default Coins;
