
import React, { useState, useEffect } from 'react';
import { RiWindowsFill, RiAppleFill, RiUbuntuFill, RiDiscordFill, RiMailLine, RiGithubFill } from '../components/icons';

interface DownloadLink {
    os: 'windows' | 'mac' | 'linux';
    label: string;
    href: string;
    priority: number;
    icon: React.ComponentType<{ className?: string }>;
}

const initialDownloadLinks: DownloadLink[] = [
    { os: 'windows', label: 'Windows', href: 'https://github.com/tidewave-ai/tidewave_app/releases/latest/download/tidewave-app-x64.exe', priority: 1, icon: RiWindowsFill },
    { os: 'mac', label: 'macOS (Apple Silicon)', href: 'https://github.com/tidewave-ai/tidewave_app/releases/latest/download/tidewave-app-aarch64.dmg', priority: 1, icon: RiAppleFill },
    { os: 'mac', label: 'macOS (Intel)', href: 'https://github.com/tidewave-ai/tidewave_app/releases/latest/download/tidewave-app-x64.dmg', priority: 2, icon: RiAppleFill },
    { os: 'linux', label: 'Linux (AppImage)', href: 'https://github.com/tidewave-ai/tidewave_app/releases/latest/download/tidewave-app-amd64.AppImage', priority: 1, icon: RiUbuntuFill },
];

const FrameworkLogo: React.FC<{ name: string; imgSrc: string; href: string; sizeClass?: string, invert?: boolean }> = ({ name, imgSrc, href, sizeClass = 'size-16', invert }) => (
    <a className="hover:brightness-125 transition-all flex flex-col items-center gap-2 group" href={href} target="_blank" rel="noopener noreferrer">
        <div className={`flex items-center justify-center ${sizeClass}`}>
            <img className={`object-contain h-full w-auto ${invert ? 'invert' : ''}`} alt={name} src={imgSrc} />
        </div>
        <span className="text-muted-foreground">{name}</span>
    </a>
);


const InstallPage: React.FC<{ isStarting: boolean }> = ({ isStarting }) => {
    const [sortedLinks, setSortedLinks] = useState(initialDownloadLinks);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMac = userAgent.includes('mac');
        const isWindows = userAgent.includes('win');
        const isLinux = userAgent.includes('linux') && !userAgent.includes('android');

        const sorted = [...initialDownloadLinks].sort((a, b) => {
            let aScore = 0;
            let bScore = 0;

            if (isMac && a.os === 'mac') aScore = 100 - a.priority;
            else if (isWindows && a.os === 'windows') aScore = 100;
            else if (isLinux && a.os === 'linux') aScore = 100;

            if (isMac && b.os === 'mac') bScore = 100 - b.priority;
            else if (isWindows && b.os === 'windows') bScore = 100;
            else if (isLinux && b.os === 'linux') bScore = 100;
            
            return bScore - aScore;
        });

        setSortedLinks(sorted);
    }, []);
    
    const startingClasses = 'scale-125 opacity-0 blur-sm';
    const finalClasses = 'scale-100 opacity-100 blur-0';
    const transitionClasses = `transition-all duration-1000 ${isStarting ? startingClasses : finalClasses}`;


    return (
        <div className="relative">
            <div className="absolute inset-0 -top-2 h-[1200px] w-full bg-hero [background-size:200%_60%] sm:[background-size:100%_100%] opacity-20"></div>
            <div className="relative z-10 container mx-auto px-4 pt-28 pb-8">
                <div className="flex flex-col items-center">
                    <div className={`mt-8 max-w-[700px] ${transitionClasses}`}>
                        <p className="text-center text-2xl leading-tight font-bold md:text-4xl text-foreground">
                            Install Tidewave Web
                        </p>
                    </div>
                    <div className={`mt-2 max-w-[550px] ${transitionClasses}`}>
                        <p className="text-center sm:text-lg text-muted-foreground">
                            The coding agent for full-stack web app development.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative container mx-auto px-4 py-12">
                {/* Step 1 */}
                <div className="card bg-card/70 backdrop-blur-xl border border-card/50 shadow-2xl rounded-2xl max-w-4xl mx-auto">
                    <div className="p-8">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full text-primary-foreground font-bold mr-4 bg-primary">1</div>
                            <h2 className="text-2xl font-bold text-foreground">Install the Tidewave app</h2>
                        </div>
                        <p className="text-muted-foreground mt-3 inline-block">To get started, download our desktop app:</p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                           {sortedLinks.map(link => (
                               <a key={link.href} className="flex items-center gap-3 justify-start p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors" href={link.href} target="_blank" rel="noopener noreferrer">
                                   <link.icon className="size-5 text-foreground/80" /> {link.label}
                               </a>
                           ))}
                        </div>
                        <p className="text-sm text-muted-foreground/80 mt-6">
                            Advanced users can also use the <a href="https://hexdocs.pm/tidewave/installation.html#cli" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">tidewave CLI</a>.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="card bg-card/70 backdrop-blur-xl border border-card/50 shadow-2xl rounded-2xl max-w-4xl mx-auto mt-12">
                    <div className="p-8">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full text-primary-foreground font-bold mr-4 bg-primary">2</div>
                            <h2 className="text-2xl font-bold text-foreground">Connect Tidewave to your web app</h2>
                        </div>
                        <p className="text-muted-foreground mt-3 inline-block">
                            Open up Tidewave and connect it to your app (typically running on <code className="font-mono bg-muted/80 px-1 py-0.5 rounded text-sm text-foreground/80">localhost</code>).
                            <br/> Then follow the steps for your preferred web framework:
                        </p>
                        <div className="py-8 text-center">
                            <div className="mt-8 mb-4 flex flex-wrap items-center justify-center gap-8 text-sm">
                                <FrameworkLogo name="Django" imgSrc="https://tidewave.ai/assets/logo-django-e6e3f5dc7c199f384e5814c97a683578.svg" href="https://github.com/tidewave-ai/tidewave_python#django" />
                                <FrameworkLogo name="FastAPI" imgSrc="https://tidewave.ai/assets/logo-fastapi-fae1c434b892043c5aeb6e9fef206f4a.svg" href="https://github.com/tidewave-ai/tidewave_python#fastapi" sizeClass="size-12" />
                                <FrameworkLogo name="Flask" imgSrc="https://tidewave.ai/assets/logo-flask-318c795b48bf389a0ff4bd7951bcbe45.svg" href="https://github.com/tidewave-ai/tidewave_python#flask" invert={true} />
                                <FrameworkLogo name="Next.js" imgSrc="https://tidewave.ai/assets/logo-nextjs-1931be01502443ae7e470d38354b12ca.svg" href="https://github.com/tidewave-ai/tidewave_js#nextjs" sizeClass="size-12" invert={true}/>
                                <FrameworkLogo name="Phoenix" imgSrc="https://tidewave.ai/assets/logo-phoenix-06a11be1f2cdde2c851763d00bdd2e80.svg" href="https://github.com/tidewave-ai/tidewave_phoenix" />
                                <FrameworkLogo name="Rails" imgSrc="https://tidewave.ai/assets/logo-rails-cf416f14a2926966b14dc5720751ac44.svg" href="https://github.com/tidewave-ai/tidewave_rails" />
                                <FrameworkLogo name="React" imgSrc="https://tidewave.ai/assets/logo-react-c3fbd71b12b726e00eec2b59f3c76786.svg" href="https://hexdocs.pm/tidewave/react.html" sizeClass="size-12" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="card bg-card/70 backdrop-blur-xl border border-card/50 shadow-2xl rounded-2xl max-w-4xl mx-auto mt-12">
                    <div className="p-8">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full text-primary-foreground font-bold mr-4 bg-primary">3</div>
                            <h2 className="text-2xl font-bold text-foreground">Have fun!</h2>
                        </div>
                        <p className="text-muted-foreground mt-3 inline-block">If you need any help, join our community to get support from the Tidewave team and other developers.</p>
                        <div className="my-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <a className="flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors" href="https://discord.gg/5GhK7E54yA" target="_blank" rel="noopener noreferrer">
                                <RiDiscordFill className="size-5" /> Join Discord
                            </a>
                            <a className="flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors" href="mailto:support@tidewave.ai" target="_blank" rel="noopener noreferrer">
                                <RiMailLine className="size-5" /> Email support
                            </a>
                            <a className="flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors" href="https://github.com/tidewave-ai" target="_blank" rel="noopener noreferrer">
                                <RiGithubFill className="size-5" /> View on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallPage;
