import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, MousePointer2, Clock, ArrowUpRight, ArrowDownRight, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

const data = [
    { name: 'Mon', visits: 2400, conversions: 400 },
    { name: 'Tue', visits: 1398, conversions: 300 },
    { name: 'Wed', visits: 9800, conversions: 2000 },
    { name: 'Thu', visits: 3908, conversions: 2780 },
    { name: 'Fri', visits: 4800, conversions: 1890 },
    { name: 'Sat', visits: 3800, conversions: 2390 },
    { name: 'Sun', visits: 4300, conversions: 3490 },
];

const stats = [
    { label: 'Total Visits', value: '45,231', change: '+12.5%', icon: Users, trend: 'up' },
    { label: 'Avg. Stay', value: '4m 32s', change: '+5.2%', icon: Clock, trend: 'up' },
    { label: 'Bounce Rate', value: '24.8%', change: '-2.1%', icon: MousePointer2, trend: 'down' },
    { label: 'Active Pages', value: '12', change: '0%', icon: Layout, trend: 'neutral' },
];

interface AnalyticsDashboardProps {
    isArabic?: boolean;
}

export function AnalyticsDashboard({ isArabic = false }: AnalyticsDashboardProps) {
    return (
        <div className="p-8 space-y-8 h-full overflow-y-auto animate-fade-in bg-background">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {isArabic ? 'التحليلات' : 'Analytics Overview'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isArabic ? 'متابعة أداء موقعك في الوقت الفعلي' : 'Track your site performance in real-time'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-card border border-border px-3 py-1.5 rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full",
                                    stat.trend === 'up' ? "bg-green-100 text-green-700" :
                                        stat.trend === 'down' ? "bg-red-100 text-red-700" :
                                            "bg-gray-100 text-gray-700"
                                )}>
                                    {stat.change}
                                    {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                                    {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 bg-card rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-semibold">{isArabic ? 'حركة الزوار' : 'Visitor Traffic'}</h3>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                                <span>Visits</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-accent" />
                                <span>Conversions</span>
                            </div>
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
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="hsl(var(--primary))"
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-6 bg-card rounded-2xl border border-border">
                    <h3 className="font-semibold mb-8">{isArabic ? 'مصادر الزيارات' : 'Traffic Sources'}</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Bar
                                    dataKey="conversions"
                                    fill="hsl(var(--accent))"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
