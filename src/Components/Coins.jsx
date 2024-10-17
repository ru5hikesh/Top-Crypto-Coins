import { useState, useEffect } from 'react';

function Coins() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch('/api/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': '021de370-ae36-437b-93fd-ece705da9ed0',
            },
        })
            .then((res) => res.json())
            .then((data) => setCoins(data.data || []))
            .catch((err) => console.error(err));
    }, []);

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
                        <div className="coin-row" key={coin.id}>
                            <div className="coin-cell">{index + 1}</div>
                            <div className="coin-cell coin-name">
                                <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`} alt={coin.name} />
                                <span>{coin.name}</span>

                            </div>
                            <div className="coin-cell">${coin.quote.USD.price.toFixed(2)}</div>
                            <div className={`coin-cell ${coin.quote.USD.percent_change_24h > 0 ? 'positive' : 'negative'}`}>
                                {coin.quote.USD.percent_change_24h.toFixed(2)}%
                            </div>
                            <div className="coin-cell">${(coin.quote.USD.market_cap / 1e9).toFixed(2)}B</div>
                            <div className="coin-cell">${(coin.quote.USD.volume_24h / 1e9).toFixed(2)}B</div>
                            <div className="coin-cell">{(coin.circulating_supply / 1e6).toFixed(2)}M {coin.symbol}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Coins;
