import React from 'react';

export default function Header() {
    const handleNavigation = (page) => {
        window.location.hash = page; // Change the URL fragment
    };

    return (
        <div>
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a
                            href="home"
                            className="nav-link active"
                            onClick={() => handleNavigation('home')}
                            aria-current="page"
                        >
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="coins"
                            className="nav-link"
                            onClick={() => handleNavigation('coins')}
                        >
                            Coins
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="news"
                            className="nav-link"
                            onClick={() => handleNavigation('news')}
                        >
                            News
                        </a>
                    </li>
                </ul>
            </header>
        </div>
    );
}
