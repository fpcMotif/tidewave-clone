
import React, { useState, useRef, useEffect } from 'react';
import { RiPlayFill, RiArrowRightLine, RiDownloadLine, RiDiscordFill, RiRobot2Line, RiFlashlightLine, RiDatabase2Line, RiFileSearchLine, RiBracesLine, RiArticleLine } from '../components/icons';

const FaqItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-border">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left py-4">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="font-medium sm:text-xl text-foreground">{title}</h3>
                    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </span>
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-4 text-muted-foreground">{children}</div>
            </div>
        </div>
    );
};

const VideoPlayer: React.FC<{ poster: string, webm: string, mp4: string }> = ({ poster, webm, mp4 }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => {});
                } else {
                    if(videoRef.current) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
         <div ref={containerRef} className="relative group transition-all duration-500 ease-out">
            <video ref={videoRef} className="w-[480px] h-[270px] object-cover rounded-lg" poster={poster} muted loop playsInline preload="metadata">
                <source src={webm} type="video/webm" />
                <source src={mp4} type="video/mp4" />
            </video>
        </div>
    );
};


const HomePage: React.FC<{ isStarting: boolean }> = ({ isStarting }) => {
    const [showVideoModal, setShowVideoModal] = useState(false);

    const startingClasses = 'scale-125 opacity-0 blur-sm';
    const finalClasses = 'scale-100 opacity-100 blur-0';

    const getTransitionClasses = (delay: string = 'duration-1000') => {
        return `transition-all ${delay} ${isStarting ? startingClasses : finalClasses}`;
    }

    return (
        <div className="overflow-x-hidden">
            <div className="relative">
                <div className="absolute inset-0 -top-2 h-[1600px] w-full bg-hero [background-size:200%_60%] sm:[background-size:100%_100%] opacity-20"></div>
                <div className="relative z-10 container mx-auto px-4 py-28">
                    <div className="flex flex-col items-center">
                        <div className={`mt-8 max-w-[700px] ${getTransitionClasses()}`}>
                            <h1 className="text-center text-3xl leading-tight font-bold md:text-5xl text-foreground">
                                The coding agent for&nbsp;
                                <span className="animated-text-gradient text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    full-stack
                                </span>
                                &nbsp;web app development
                            </h1>
                        </div>
                        <div className={`mt-6 max-w-[650px] xl:mt-8 ${getTransitionClasses('duration-1000')}`}>
                            <p className="text-center sm:text-lg text-muted-foreground">
                                Integrate Claude Code, OpenAI Codex, and other agents with your web app and web framework at every layer, from UI to database.
                            </p>
                        </div>
                        <div className={`mt-6 xl:mt-8 flex flex-col md:flex-row gap-5 ${getTransitionClasses('duration-1000')}`}>
                            <a className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors" href="#/install">
                                <RiDownloadLine className="size-5" /> Install Tidewave
                            </a>
                            <a className="flex items-center justify-center gap-3 bg-foreground text-background px-5 py-3 rounded-full font-semibold hover:bg-foreground/90 transition-colors" href="https://discord.gg/5GhK7E54yA" target="_blank" rel="noopener noreferrer">
                                <RiDiscordFill className="size-5" /> Join our Discord
                            </a>
                        </div>

                        <div className="mt-8 xl:mt-12 relative lg:w-[800px] mx-auto z-10" onClick={() => setShowVideoModal(true)}>
                            <img src="https://tidewave.ai/images/landing/hero-be2d98514121f33e53fdbd4d2b10d70a.jpeg" className="rounded-lg sm:rounded-2xl" alt="Introducing Tidewave Web" loading="lazy" />
                            <div className="absolute inset-0 bg-gray-900/30 rounded-lg sm:rounded-2xl flex justify-center items-center group cursor-pointer">
                                <div className="group-hover:scale-110 flex justify-center items-center absolute z-10 transition-transform">
                                    <RiPlayFill className="size-10 absolute z-10 text-primary-foreground" />
                                    <div className="absolute rounded-full w-20 h-20 bg-primary"></div>
                                    <div className="absolute rounded-full w-24 h-24 bg-primary/40 animate-pulse"></div>
                                </div>
                                <div className="absolute bottom-10">
                                  <div className="group-hover:flex flex-col justify-center items-center rounded-full bg-background px-8 pt-4 pb-3 text-xs mt-9 hidden transition-all">
                                      <div className="font-semibold text-muted-foreground">
                                          Introducing Tidewave Web
                                      </div>
                                      <div className="flex items-center mt-1">
                                          <div className="text-muted-foreground font-medium px-2">1 min</div>
                                          <div className="flex items-center text-primary font-medium">
                                              <div>Watch Now</div>
                                              <RiArrowRightLine className="size-5" />
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="features" className="relative container mx-auto px-4 max-w-7xl">
                <div className="text-center z-10 py-8 md:py-12 xl:py-16 2xl:py-20">
                    <h2 className="text-3xl font-semibold text-foreground">Features</h2>
                </div>
                 <div className="space-y-16 lg:space-y-32 lg:my-8">
                     <div className="relative z-10 flex flex-col gap-6 lg:flex-row items-center lg:items-start">
                         <div className="flex-shrink-0 max-w-md">
                             <div className="inline-flex items-center rounded border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 p-2.5">
                                 <i className="ri-code-s-slash-line size-5"></i>
                             </div>
                             <h3 className="mt-3 text-xl font-semibold text-foreground">Shared coding environment</h3>
                             <p className="text-muted-foreground mt-4">Tidewave runs within your actual development environment and can modify any part of your web application. Tidewave also understands your UI and your application lifecycle, making AI development more seamless and efficient.</p>
                         </div>
                         <div className="flex-1 flex my-4 lg:my-0 lg:justify-end">
                            <VideoPlayer poster="https://tidewave.ai/images/landing/agents-204ded8a529083551924a3361836cac3.jpeg" webm="https://tidewave.ai/images/landing/agents-2edd8bdcf0111061157bda049351e01f.webm" mp4="https://tidewave.ai/images/landing/agents-e1cc97a706a461b1424bf07621fe8a2c.mp4" />
                         </div>
                     </div>
                     <div className="relative z-10 flex flex-col gap-6 lg:flex-row items-center lg:items-start">
                         <div className="flex-1 flex my-4 lg:my-0 lg:justify-start order-2 lg:order-1">
                             <VideoPlayer poster="https://tidewave.ai/images/landing/prompt-21baa5b42f66269605223ad7b8ca08a8.jpeg" webm="https://tidewave.ai/images/landing/prompt-d394bc6e6232d3137c028169fdbf2805.webm" mp4="https://tidewave.ai/images/landing/prompt-08d8b765d83c99277dea255a24f89645.mp4" />
                         </div>
                         <div className="flex-shrink-0 max-w-md order-1 lg:order-2">
                            <div className="inline-flex items-center rounded border border-primary/20 bg-primary/10 text-primary p-2.5">
                                <i className="ri-cursor-line size-5"></i>
                            </div>
                             <h3 className="mt-3 text-xl font-semibold text-foreground">Point and click prompting</h3>
                             <p className="text-muted-foreground mt-4">Use the inspector feature to select UI elements, map them to their source code, and send all relevant metadata to the agent, eliminating the need to describe what you're looking at or manually trace code paths. Works transparently with front-end components and backend templates.</p>
                         </div>
                     </div>
                     <div className="relative z-10 flex flex-col gap-6 lg:flex-row items-center lg:items-start">
                         <div className="flex-shrink-0 max-w-md">
                             <div className="inline-flex items-center rounded border border-green-400/20 bg-green-400/10 text-green-400 p-2.5">
                                <i className="ri-compass-3-line size-5"></i>
                             </div>
                             <h3 className="mt-3 text-xl font-semibold text-foreground">Contextual browser testing</h3>
                             <p className="text-muted-foreground mt-4">Tidewave builds complete features and validates they work right there in the browser, using the same session as you. No more copying stacktraces or losing context between tools.</p>
                         </div>
                         <div className="flex-1 flex my-4 lg:my-0 lg:justify-end">
                             <VideoPlayer poster="https://tidewave.ai/images/landing/testing-32d0c0516bf920d21da602e53d9c8607.jpeg" webm="https://tidewave.ai/images/landing/testing-25bfc4a8e69c92b7eac39d17996fc09c.webm" mp4="https://tidewave.ai/images/landing/testing-295add74c33d41e50139a7d1f4e61fac.mp4" />
                         </div>
                     </div>
                 </div>
            </div>
            
            <div className="container mx-auto px-4 mt-16 md:mt-28 py-16 max-w-6xl">
                <div className="relative px-8 py-8 md:py-12 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-border/50">
                    <div className="bg-grainy absolute inset-0 z-0 opacity-20"></div>
                    <div className="relative text-center z-10">
                        <div className="inline-flex items-center rounded border border-orange-500/20 bg-orange-500/10 p-2">
                            <RiRobot2Line className="size-5 text-orange-500" />
                        </div>
                        <p className="mt-2 text-2xl font-semibold text-foreground">
                            Works with your coding agent
                        </p>
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 text-sm text-muted-foreground">
                            <a className="hover:brightness-110 gap-2 group flex flex-col items-center" href="#">
                                <div className="size-12 flex items-center justify-center rounded-xl bg-[#D97757]">
                                    <img className="size-8 invert" alt="Claude Code" src="https://tidewave.ai/assets/logo-claude-e1500e357539d533bcef4a4f0df21bb8.svg" />
                                </div>
                                <span>Claude Code</span>
                            </a>
                            <a className="hover:brightness-110 gap-2 group flex flex-col items-center" href="#">
                                <div className="size-12 flex items-center justify-center rounded-xl bg-[#0CA380]">
                                    <img className="size-8 invert" alt="OpenAI Codex Code" src="https://tidewave.ai/assets/logo-openai-cb2482db5614562f115b9ea6139550a9.svg" />
                                </div>
                                <span>OpenAI Codex</span>
                            </a>
                            <a className="hover:brightness-110 gap-2 group flex flex-col items-center" href="#">
                                <div className="size-12 flex items-center justify-center rounded-xl bg-[#eee]">
                                    <img className="size-8" alt="GitHub Copilot" src="https://tidewave.ai/assets/logo-copilot-4ae271bdd916f54757bf75e216f726b0.svg" />
                                </div>
                                <span>GitHub Copilot</span>
                            </a>
                        </div>
                        <p className="text-muted-foreground mt-12 inline-block text-sm max-w-md">
                            You can also bring your own API key (Anthropic, OpenAI, OpenRouter)
                            or any {' '}
                            <a href="https://agentclientprotocol.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                ACP-compatible
                            </a>
                            {' '}coding agent.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 xl:py-24">
                <div className="text-center z-10">
                    <div className="inline-flex items-center rounded border border-green-400/20 bg-green-400/10 p-2">
                        <RiFlashlightLine className="size-5 text-green-400" />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-foreground">
                        Deeply integrated with your web framework
                    </h3>
                    <p className="text-muted-foreground mt-3 inline-block max-w-[38rem]">
                        Our coding agent has access to the same data and APIs as you,
                        from the database to documentation, to deliver higher-quality
                        features at greater speed. We call it <span className="animated-text-gradient text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold">Runtime Intelligence</span>.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4 2xl:mt-16 2xl:gap-6">
                    <div className="p-6 rounded-lg border border-border/50 cursor-default hover:border-blue-500/40 hover:bg-blue-500/5 transition-all">
                        <div className="inline-flex items-center rounded bg-blue-500/10 p-2 text-blue-500">
                            <RiDatabase2Line className="size-5" />
                        </div>
                        <p className="mt-3 text-lg font-medium text-foreground">Database integration</p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            Connect to your application data sources to run queries and inspect schemas
                        </p>
                    </div>
                    <div className="p-6 rounded-lg border border-border/50 cursor-default hover:border-violet-500/40 hover:bg-violet-500/5 transition-all">
                        <div className="inline-flex items-center rounded bg-violet-500/10 p-2 text-violet-500">
                            <RiFileSearchLine className="size-5" />
                        </div>
                        <p className="mt-3 text-lg font-medium text-foreground">Logs and runtime introspection</p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            Understand how the system actually runs by accessing application logs, traces, and source locations
                        </p>
                    </div>
                    <div className="p-6 rounded-lg border border-border/50 cursor-default hover:border-cyan-600/40 hover:bg-cyan-600/5 transition-all">
                        <div className="inline-flex items-center rounded bg-cyan-600/10 p-2 text-cyan-600">
                            <RiBracesLine className="size-5" />
                        </div>
                        <p className="mt-3 text-lg font-medium text-foreground">Code evaluation</p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            Debug errors and explore APIs by running code within your web app, as any developer would
                        </p>
                    </div>
                    <div className="p-6 rounded-lg border border-border/50 cursor-default hover:border-fuchsia-500/40 hover:bg-fuchsia-500/5 transition-all">
                        <div className="inline-flex items-center rounded bg-fuchsia-500/10 p-2 text-fuchsia-500">
                            <RiArticleLine className="size-5" />
                        </div>
                        <p className="mt-3 text-lg font-medium text-foreground">Documentation context</p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                            Access your app's documentation, including its dependencies, without manual copy and pasting
                        </p>
                    </div>
                </div>
            </div>

            <div id="pricing" className="relative container mx-auto px-4 my-8 py-8 md:py-12 xl:py-16 2xl:py-20">
                <div className="text-center z-10">
                    <h2 className="text-3xl font-semibold text-foreground">Pricing</h2>
                    <p className="mt-2 text-muted-foreground inline-block max-w-2xl">
                    Pro and Teams subscriptions unlock all Tidewave features. You'll also need one of: Claude Code, OpenAI Codex, GitHub Copilot, or bring your own API key.
                    </p>
                </div>
            </div>

            <div id="faq" className="container mx-auto px-4 py-8 md:py-12 xl:py-16">
                 <div className="grid gap-12 lg:grid-cols-7">
                     <div className="col-span-3">
                         <div className="inline-flex items-center rounded border border-purple-400/20 bg-purple-400/10 p-2">
                             <i className="ri-question-answer-line text-purple-400 size-5"></i>
                         </div>
                         <p className="mt-4 text-3xl font-semibold text-foreground">Need Help?</p>
                         <p className="text-muted-foreground mt-3 inline-block max-w-lg">If you have questions, <a className="text-primary hover:underline" href="mailto:support@tidewave.ai">don't hesitate to reach out</a>.</p>
                     </div>
                     <div className="col-span-4 space-y-2">
                        <FaqItem title="How is Tidewave different from other coding agents?">
                            <p>Tidewave differs from traditional coding agents by operating directly within your browser, maintaining shared context between you, the agent, and your app. This eliminates the tedious back-and-forth translation process and allows the agent to build and validate complete features without losing context, making development far more seamless and efficient.</p>
                        </FaqItem>
                        <FaqItem title="Which coding agents do you support?">
                            <p>We have support Claude Code, OpenAI Codex, GitHub Copilot subscriptions, as well as any coding agent that implements ACP. You may also bring your own API key for Anthropic, OpenAI, and OpenRouter.</p>
                        </FaqItem>
                        <FaqItem title="Do you offer trial plans?">
                           <p>Yes! The Pro plan includes a free trial, no credit card required, with a limit of 20 user messages per month.</p>
                        </FaqItem>
                     </div>
                 </div>
            </div>

            {showVideoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={() => setShowVideoModal(false)}>
                    <div className="relative bg-black rounded-lg w-full max-w-5xl" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowVideoModal(false)} className="absolute -top-1 -right-1 lg:-top-3 lg:-right-3 cursor-pointer bg-background rounded-full p-1 z-10">
                            <i className="ri-close-line size-5 text-foreground"></i>
                        </button>
                        <div className="p-1">
                            <iframe className="w-full h-auto aspect-video" src="https://www.youtube.com/embed/v_mv5ggdIZQ?si=atrJPL4YDQVMKE_n&autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;