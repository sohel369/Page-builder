import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Mail, Lock, User, Github, ArrowRight, Loader2, Layers, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Welcome back!');
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                toast.success('Account created successfully!');
            }
            navigate('/dashboard');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success('Signed in with Google!');
            navigate('/dashboard');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background selection:bg-primary/20 overflow-x-hidden font-sans">
            {/* Left side: Premium Visuals */}
            <div className="hidden lg:flex relative bg-slate-950 items-center justify-center p-12 overflow-hidden order-last lg:order-first">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--glass-border)_1px,_transparent_1px)] bg-[size:24px_24px] opacity-20" />
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />

                <div className="relative z-10 max-w-lg">
                    <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mb-10 shadow-2xl animate-float">
                        <Layers className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-7xl font-black text-white mb-10 leading-[0.9] tracking-tighter">
                        Elite <br /><span className="text-gradient">Architect</span> <br />Access
                    </h1>
                    <p className="text-slate-400 text-xl leading-relaxed mb-16 font-medium italic">
                        Step into the command center of high-performance digital creation. PageWeaver Studio v1.0.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: 'Quantum Sync', icon: Sparkles, color: 'text-primary' },
                            { label: 'Secure Vault', icon: Lock, color: 'text-accent' },
                            { label: 'Core Engine', icon: Layers, color: 'text-primary' },
                            { label: 'Cloud Edge', icon: Github, color: 'text-white' },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all group cursor-default">
                                <item.icon className={cn("w-7 h-7 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500", item.color)} />
                                <span className="text-white font-black text-xs tracking-[0.2em] uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side: Auth Form */}
            <div className="flex items-center justify-center p-6 md:p-12 relative">
                <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
                <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-accent/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />

                <div className="w-full max-w-md space-y-12 relative z-10 py-12 md:py-0">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                            {isLogin ? 'Welcome Back' : 'Join the Elite'}
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg font-medium italic">
                            {isLogin ? 'Your digital command center is ready.' : 'Initialize your architectural journey.'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-8">
                        {!isLogin && (
                            <div className="space-y-3">
                                <label className="text-xs font-black ml-1 flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                                    <User className="w-3 h-3 text-primary" />
                                    Identity Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-6 py-5 bg-muted/20 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all outline-none text-base font-bold shadow-inner"
                                />
                            </div>
                        )}

                        <div className="space-y-3">
                            <label className="text-xs font-black ml-1 flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                                <Mail className="w-3 h-3 text-primary" />
                                Secure Email
                            </label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-6 py-5 bg-muted/20 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all outline-none text-base font-bold shadow-inner"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                                    <Lock className="w-3 h-3 text-primary" />
                                    Access Key
                                </label>
                                {isLogin && <button type="button" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Lost Key?</button>}
                            </div>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-6 py-5 bg-muted/20 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all outline-none text-base font-bold shadow-inner"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-5 premium-gradient text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(139,92,246,0.3)] hover:shadow-[0_25px_50px_rgba(139,92,246,0.4)] hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-xl mt-6 uppercase tracking-widest"
                        >
                            {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                                <>
                                    <span>{isLogin ? 'Initialize Access' : 'Create Identity'}</span>
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
                            <span className="bg-background px-6 text-muted-foreground/40 italic">Biometric Redundancy</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex items-center justify-center gap-3 px-6 py-5 rounded-2xl border border-white/5 bg-muted/10 hover:bg-muted/20 transition-all font-black text-xs uppercase tracking-widest shadow-sm active:scale-95"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 px-6 py-5 rounded-2xl border border-white/5 bg-muted/10 hover:bg-muted/20 transition-all font-black text-xs uppercase tracking-widest shadow-sm active:scale-95 text-foreground">
                            <Github className="w-5 h-5" />
                            <span>Github</span>
                        </button>
                    </div>

                    <div className="text-center text-base font-medium text-muted-foreground">
                        {isLogin ? "New to PageWeaver?" : "Already an architect?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary font-extrabold hover:underline ml-2 transition-all"
                        >
                            {isLogin ? 'Create Access' : 'Sign In Now'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

