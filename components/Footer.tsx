
import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="relative">
            <div className="bg-grainy absolute inset-0 z-0 opacity-20"></div>
            <div className="relative z-2 container mx-auto px-4 pt-8 md:pt-12 xl:pt-16">
                <div className="py-16 grid grid-cols-2 gap-12 md:gap-6 md:grid-cols-5">
                    <div className="col-span-2">
                        <p className="text-2xl font-medium text-foreground">Tidewave.</p>
                        <p className="text-muted-foreground mt-2">
                            By <a href="https://dashbit.co/" className="text-primary hover:underline">Dashbit</a>, the creators of
                            <a href="https://elixir-lang.org/" className="text-primary hover:underline"> Elixir</a>
                            and <a href="https://livebook.dev/" className="text-primary hover:underline"> Livebook</a>.<br />
                            Copyright 2025. All rights reserved.
                        </p>
                        <p className="text-muted-foreground/80 mt-6 italic text-sm">
                            All logos and product names are trademarks or registered trademarks
                            of their respective owners and are used for identification purposes
                            only to indicate compatibility with Tidewave's products.
                        </p>
                    </div>
                    <div className="max-md:hidden xl:col-span-1"></div>
                    <div className="col-span-1">
                        <p className="font-medium text-foreground">Quick Links</p>
                        <div className="text-muted-foreground mt-5 flex flex-col space-y-1.5">
                            <a href="https://dashbit.co/" target="_blank" className="hover:text-foreground">Company</a>
                            <a href="https://discord.gg/5GhK7E54yA" target="_blank" className="hover:text-foreground">Discord</a>
                            <a href="mailto:support@tidewave.ai" target="_blank" className="hover:text-foreground">Email</a>
                            <a href="https://github.com/tidewave-ai" target="_blank" className="hover:text-foreground">GitHub</a>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium text-foreground">Legal</p>
                        <div className="text-muted-foreground mt-5 flex flex-col space-y-1.5">
                            <a href="https://tidewave.ai/terms" target="_blank" className="hover:text-foreground">Terms of Service</a>
                            <a href="https://tidewave.ai/privacy" target="_blank" className="hover:text-foreground">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
