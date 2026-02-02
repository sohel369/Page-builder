import { useState } from 'react';
import {
    BarChart3,
    Users,
    MousePointer2,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Layout,
    Plus,
    Sparkles,
    Zap,
    Globe,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', visits: 2400, conversions: 400 },
    { name: 'Tue', visits: 1398, conversions: 300 },
    { name: 'Wed', visits: 9800, conversions: 2000 },
    { name: 'Thu', visits: 3908, conversions: 2780 },
    { name: 'Fri', visits: 4800, conversions: 1890 },
    { name: 'Sat', visits: 3800, conversions: 2390 },
    { name: 'Sun', visits: 4300, conversions: 3490 },
];

export default function DashboardHome({ isArabic = false }: { isArabic?: boolean }) {
    return (
        <div className="p-6 md:p-8 space-y-8 animate-fade-in bg-background overflow-y-auto h-full">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                        {isArabic ? 'لوحة التحكم' : "Welcome to your Studio"}
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1 italic">
                        {isArabic ? 'مرحباً بك في استوديو باني الصفحات' : "Propelling your digital vision forward."}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-all font-bold text-sm">
                        <Globe className="w-4 h-4 text-primary" />
                        Live Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl premium-gradient text-white font-bold text-sm shadow-lg hover:opacity-90 transition-all active:scale-95">
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: isArabic ? 'إجمالي التفاعلات' : 'Total Engagement', value: '124.5k', change: '+14%', icon: Users, trend: 'up' },
                    { label: isArabic ? 'سرعة الجلسة' : 'Session Velocity', value: '18.2s', change: '+5%', icon: Zap, trend: 'up' },
                    { label: isArabic ? 'مؤشر النقر' : 'CTR Index', value: '12.4%', change: '-2%', icon: MousePointer2, trend: 'down' },
                    { label: isArabic ? 'حالة السحابة' : 'Cloud Status', value: isArabic ? 'نشط' : 'Active', icon: Globe, trend: 'neutral' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl glass border border-white/10 group hover:border-primary/30 transition-all text-left">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 premium-gradient rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            {stat.change && (
                                <div className={cn(
                                    "flex items-center gap-1 text-[10px] font-extrabold px-2 py-1 rounded-full",
                                    stat.trend === 'up' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    {stat.change}
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                </div>
                            )}
                        </div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-black mt-1 text-foreground">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Main Insights Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-3xl glass border border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">{isArabic ? 'ذكاء النمو' : 'Growth Intelligence'}</h3>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary uppercase tracking-widest">Real-time Data</div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                    itemStyle={{ color: 'white' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="hsl(var(--primary))"
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                    strokeWidth={4}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Action Widgets */}
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl premium-gradient text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <Sparkles className="w-10 h-10 mb-6 opacity-80" />
                        <h3 className="text-xl font-black mb-2 leading-tight">Pro Features Unlocked</h3>
                        <p className="text-white/80 text-sm font-medium mb-6 italic">Access advanced algorithmic layouts and enterprise-level scaling tools.</p>
                        <button className="w-full py-3 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">
                            Upgrade Account
                        </button>
                    </div>

                    <div className="p-6 rounded-3xl glass border border-white/10">
                        <div className="flex items-center gap-2 mb-4 font-bold text-sm">
                            <Bell className="w-4 h-4 text-primary" />
                            Activity Stream
                        </div>
                        <div className="space-y-4">
                            {[
                                { user: 'Sarah M.', action: 'published "Hero Page"', time: '2m' },
                                { user: 'John K.', action: 'updated "Pricing"', time: '15m' },
                                { user: 'Studio AI', action: 'optimized assets', time: '1h' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                    <div className="flex gap-2">
                                        <span className="font-black text-foreground">{item.user}</span>
                                        <span className="text-muted-foreground">{item.action}</span>
                                    </div>
                                    <span className="text-muted-foreground font-bold">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
