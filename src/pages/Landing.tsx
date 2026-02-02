import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Zap,
    Shield,
    Layers,
    Smartphone,
    Globe,
    MousePointer2,
    Sparkles,
    Menu,
    X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Landing() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 overflow-x-hidden">
            {/* Decorative Blur Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
            </div>

            {/* Navigation */}
            <nav className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4",
                isScrolled ? "glass border-b border-white/10" : "bg-transparent"
            )}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg transform rotate-6">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">PageWeaver</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {['Features', 'Templates', 'Pricing', 'Resources'].map((item) => (
                            <a key={item} href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                {item}
                            </a>
                        ))}
                        <button
                            onClick={() => navigate('/auth')}
                            className="px-6 py-2.5 rounded-full premium-gradient text-white font-semibold shadow-xl hover:opacity-90 transition-all active:scale-95"
                        >
                            Sign In
                        </button>
                    </div>

                    <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={cn(
                "fixed inset-0 z-40 glass md:hidden transition-transform duration-500 flex flex-col items-center justify-center gap-8",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {['Features', 'Templates', 'Pricing', 'Resources'].map((item) => (
                    <a key={item} href="#" className="text-2xl font-bold text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        {item}
                    </a>
                ))}
                <button
                    onClick={() => navigate('/auth')}
                    className="px-10 py-4 rounded-full premium-gradient text-white font-bold text-xl shadow-2xl"
                >
                    Get Started
                </button>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-8 animate-fade-in shadow-inner">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Next-Gen Page Builder UI</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.95] animate-fade-in px-4 text-foreground">
                        Synthesize <br />
                        <span className="text-gradient">Pure Interfaces</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-2xl text-muted-foreground mb-14 leading-relaxed animate-fade-in delay-100 font-medium">
                        PageWeaver fuses elite architectural power with visceral simplicity.
                        Build high-performance digital products at the speed of thought.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 animate-fade-in delay-200">
                        <button
                            onClick={() => navigate('/auth')}
                            className="w-full sm:w-auto px-10 py-5 rounded-2xl premium-gradient text-white font-black text-xl shadow-[0_20px_40px_rgba(139,92,246,0.3)] hover:shadow-[0_25px_50px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                        >
                            Start Synthesis
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                        </button>
                        <button className="w-full sm:w-auto px-10 py-5 rounded-2xl glass font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/20 shadow-xl">
                            Live Showcase
                        </button>
                    </div>

                    {/* Interactive Mockup */}
                    <div className="relative max-w-5xl mx-auto animate-float">
                        <div className="absolute -inset-1 premium-gradient rounded-3xl blur-2xl opacity-20" />
                        <div className="glass rounded-3xl p-2 border border-white/20 shadow-2xl overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                                alt="App Interface"
                                className="w-full rounded-2xl shadow-inner group-hover:scale-[1.01] transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                                    <MousePointer2 className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-white">Live-Editing Preview</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="hidden lg:block absolute -left-12 top-1/4 glass p-4 rounded-2xl shadow-xl animate-float [animation-delay:-2s] border border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="w-32 h-2 bg-muted rounded-full" />
                                <div className="w-48 h-2 bg-muted rounded-full" />
                                <div className="w-24 h-2 bg-primary/40 rounded-full" />
                            </div>
                        </div>

                        <div className="hidden lg:block absolute -right-12 bottom-1/4 glass p-6 rounded-2xl shadow-xl animate-float [animation-delay:-4s] border border-white/20">
                            <BarChart3 className="w-8 h-8 text-primary mb-4" />
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-2 bg-primary rounded-full" />
                                    <span className="text-[10px] font-bold">+24%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-accent rounded-full" />
                                    <span className="text-[10px] font-bold">+12%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Crafted for Professionals</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to build high-converting, lightning-fast web pages without writing a single line of code.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: 'Extreme Velocity', desc: 'Optimized for performance. Pages load in milliseconds with zero bloat.' },
                            { icon: Shield, title: 'Enterprise Security', desc: 'Built-in protection for your data and your users\' privacy by default.' },
                            { icon: Smartphone, title: 'Pixel Perfect Design', desc: 'Mobile-first responsiveness that looks premium on every single screen size.' },
                            { icon: Globe, title: 'Global Deployment', desc: 'Deploy your pages worldwide with a single click on our robust infrastructure.' },
                            { icon: MousePointer2, title: 'Dynamic Interaction', desc: 'Add animations and micro-interactions effortlessly with our visual builder.' },
                            { icon: Sparkles, title: 'AI-Powered Layouts', desc: 'Let our intelligent algorithms suggest the best layouts for your content.' },
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-3xl glass border border-white/10 hover:border-primary/30 transition-all hover:scale-[1.02] shadow-sm">
                                <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center">
                                <Layers className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold">PageWeaver Studio</span>
                        </div>
                        <p className="text-sm text-muted-foreground text-center md:text-left">© 2026 PageWeaver. Build without limits.</p>
                    </div>

                    <div className="flex gap-12 text-sm font-medium">
                        <div className="flex flex-col gap-4">
                            <span className="text-foreground">Product</span>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Showcase</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-foreground">Company</span>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Support Icons
const BarChart3 = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
    </svg>
);
