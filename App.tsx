
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InstallPage from './pages/InstallPage';

const getCurrentPage = () => {
    return window.location.hash.slice(1) || '/';
}

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(getCurrentPage());
    const [isStarting, setIsStarting] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsStarting(false), 100);
        
        const onHashChange = () => {
            window.scrollTo(0, 0);
            setCurrentPage(getCurrentPage());
        };
        window.addEventListener('hashchange', onHashChange);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case '/install':
                return <InstallPage isStarting={isStarting} />;
            default:
                return <HomePage isStarting={isStarting} />;
        }
    };

    return (
        <div className="bg-background min-h-screen text-foreground font-sans">
            <Header />
            <main>{renderPage()}</main>
            <Footer />
        </div>
    );
};

export default App;
