
import React, { useState, useEffect } from 'react';
import { RiMenuLine, RiDownloadLine, RiGroupLine, RiCloseLine } from './icons';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 30);
            setIsScrolled(window.scrollY >= 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClasses = isAtTop
        ? 'sm:container [&:not([data-scrolling=down])]:top-4'
        : 'w-full sm:w-[800px] bg-card/95 shadow rounded-full';

    const navLinks = [
        { name: 'Home', href: '#/' },
        { name: 'Features', href: '#/#features' },
        { name: 'Pricing', href: '#/#pricing' },
        { name: 'News', href: 'https://tidewave.ai/blog' },
        { name: 'Docs', href: 'https://hexdocs.pm/tidewave/', external: true },
    ];

    return (
        <>
            <div className={`group fixed inset-x-0 z-50 flex justify-center transition-all duration-500`}>
                 <div className={`relative flex w-full items-center px-6 py-3 transition-all duration-500 max-sm:mx-2 lg:py-1.5 ${navClasses}`}>
                    <div className="justify-start flex items-center gap-2">
                        <div className="flex-none lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="btn drawer-button btn-ghost btn-square btn-sm p-1 rounded hover:bg-muted">
                                <RiMenuLine className="size-5" />
                            </button>
                        </div>
                        <a href="#/" className="flex gap-2 items-center">
                            <img className="h-7" src="https://tidewave.ai/assets/logo-b58bb6d3f4448770c268655d20396ed0.svg" alt="Tidewave Logo" />
                            <span className="text-xl font-bold text-foreground">Tidewave</span>
                        </a>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <ul className="hidden gap-2 px-1 lg:inline-flex">
                            {navLinks.map(link => (
                                <li key={link.name}>
                                    <a href={link.href} className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground transition-colors" target={link.external ? '_blank' : '_self'} rel={link.external ? 'noopener noreferrer' : ''}>
                                        {link.name} {link.external && <span aria-hidden="true">↗</span>}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <a className="hidden sm:flex items-center gap-2 bg-foreground text-background px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-foreground/90 transition-colors" href="#/install">
                            <RiDownloadLine className="size-4" /> Install
                        </a>
                        <div className="dropdown dropdown-end relative">
                            <div tabIndex={0} role="button" className="p-2 rounded-full bg-muted/80 hover:bg-muted">
                                <RiGroupLine className="size-4 text-foreground/80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`relative bg-background min-h-full w-80 p-4 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted">
                        <RiCloseLine className="size-6 text-muted-foreground" />
                    </button>
                    <ul className="mt-12 space-y-2">
                        {navLinks.map(link => (
                            <li key={link.name}>
                                <a href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors" target={link.external ? '_blank' : '_self'} rel={link.external ? 'noopener noreferrer' : ''}>
                                    {link.name} {link.external && <span aria-hidden="true">↗</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
