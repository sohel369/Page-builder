import { useState } from 'react';
import { Megaphone, Users, MessageSquare, Send, Bell, History, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Broadcast {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'critical';
    timestamp: string;
    recipients: string;
}

const recentBroadcasts: Broadcast[] = [
    { id: '1', title: 'System Maintenance', message: 'We will be performing scheduled maintenance tonight at 2 AM UTC.', type: 'info', timestamp: '2 hours ago', recipients: 'All Administrators' },
    { id: '2', title: 'Security Update', message: 'Critical security patches have been applied to all banking modules.', type: 'critical', timestamp: '5 hours ago', recipients: 'Primary Admins' },
    { id: '3', title: 'New Feature Rollout', message: 'The new glassmorphism effects are now available for all users.', type: 'warning', timestamp: 'Yesterday', recipients: 'Moderators' },
];

interface BroadcastPanelProps {
    isArabic?: boolean;
    currentTheme?: string;
}

export function BroadcastPanel({ isArabic = false, currentTheme = 'dark' }: BroadcastPanelProps) {
    const [selectedType, setSelectedType] = useState<'info' | 'warning' | 'critical'>('info');
    const isWhite = currentTheme === 'white';

    return (
        <div className={cn(
            "p-8 space-y-8 h-full overflow-y-auto animate-fade-in transition-all duration-500",
            isWhite ? "bg-[#FAFAFB]" : "bg-transparent"
        )}>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className={cn("text-2xl font-bold flex items-center gap-2", isWhite ? "text-slate-900" : "text-white")}>
                        <Megaphone className="w-7 h-7 text-primary" />
                        {isArabic ? 'بث التنبيهات' : 'Broadcast Center'}
                    </h1>
                    <p className={cn("mt-1", isWhite ? "text-slate-500" : "text-muted-foreground")}>
                        {isArabic ? 'إرسال تنبيهات فورية لجميع المشرفين' : 'Send instant alerts to all administrators'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* New Broadcast Form */}
                <div className={cn(
                    "p-6 rounded-2xl border shadow-sm transition-all",
                    isWhite ? "bg-white border-slate-200" : "bg-card border-border"
                )}>
                    <h3 className={cn("font-semibold mb-6 flex items-center gap-2", isWhite ? "text-slate-900" : "text-foreground")}>
                        <Send className="w-4 h-4" />
                        {isArabic ? 'إنشاء بث جديد' : 'Compose New Broadcast'}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className={cn("text-sm font-medium mb-1.5 block", isWhite ? "text-slate-700" : "text-foreground")}>Alert Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {(['info', 'warning', 'critical'] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={cn(
                                            "py-2 px-4 rounded-lg text-sm font-medium border transition-all",
                                            selectedType === type
                                                ? (type === 'info' ? "bg-blue-100 border-blue-500 text-blue-700" :
                                                    type === 'warning' ? "bg-amber-100 border-amber-500 text-amber-700" :
                                                        "bg-red-100 border-red-500 text-red-700")
                                                : (isWhite ? "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200" : "bg-secondary/50 border-transparent text-muted-foreground hover:bg-secondary")
                                        )}
                                    >
                                        {type.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className={cn("text-sm font-medium mb-1.5 block", isWhite ? "text-slate-700" : "text-foreground")}>Recipients</label>
                            <select className={cn(
                                "w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none transition-all",
                                isWhite ? "bg-slate-100 border-slate-200 text-slate-900 focus:bg-white" : "bg-secondary/50 border-transparent text-white focus:bg-secondary"
                            )}>
                                <option>All Administrators</option>
                                <option>Only Primary Admins</option>
                                <option>Only Moderators</option>
                            </select>
                        </div>

                        <div>
                            <label className={cn("text-sm font-medium mb-1.5 block", isWhite ? "text-slate-700" : "text-foreground")}>Alert Title</label>
                            <input
                                type="text"
                                placeholder="Brief summary of the alert..."
                                className={cn(
                                    "w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none transition-all",
                                    isWhite ? "bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white" : "bg-secondary/50 border-transparent text-white placeholder:text-white/40 focus:bg-secondary"
                                )}
                            />
                        </div>

                        <div>
                            <label className={cn("text-sm font-medium mb-1.5 block", isWhite ? "text-slate-700" : "text-foreground")}>Message Content</label>
                            <textarea
                                rows={4}
                                placeholder="Detailed message for administrators..."
                                className={cn(
                                    "w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none transition-all resize-none",
                                    isWhite ? "bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white" : "bg-secondary/50 border-transparent text-white placeholder:text-white/40 focus:bg-secondary"
                                )}
                            />
                        </div>

                        <button className="w-full py-3 premium-gradient text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                            <Megaphone className="w-4 h-4" />
                            Send Broadcast
                        </button>
                    </div>
                </div>

                {/* Recent Broadcasts */}
                <div className="space-y-6">
                    <h3 className={cn("font-semibold flex items-center gap-2", isWhite ? "text-slate-900" : "text-foreground")}>
                        <History className="w-4 h-4" />
                        Recent Broadcasts
                    </h3>
                    <div className="space-y-4">
                        {recentBroadcasts.map((broadcast) => (
                            <div key={broadcast.id} className={cn(
                                "p-5 rounded-xl border shadow-sm group hover:border-primary/30 transition-all",
                                isWhite ? "bg-white border-slate-200" : "bg-card border-border"
                            )}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "w-2 h-2 rounded-full",
                                            broadcast.type === 'info' ? "bg-blue-500" :
                                                broadcast.type === 'warning' ? "bg-amber-500" :
                                                    "bg-red-500"
                                        )} />
                                        <h4 className={cn("font-semibold text-sm", isWhite ? "text-slate-900" : "text-foreground")}>{broadcast.title}</h4>
                                    </div>
                                    <span className={cn("text-[10px]", isWhite ? "text-slate-400" : "text-muted-foreground")}>{broadcast.timestamp}</span>
                                </div>
                                <p className={cn("text-xs mb-3 leading-relaxed", isWhite ? "text-slate-500" : "text-muted-foreground")}>
                                    {broadcast.message}
                                </p>
                                <div className={cn("flex justify-between items-center text-[10px] pt-3 border-t", isWhite ? "border-slate-100" : "border-border")}>
                                    <div className={cn("flex items-center gap-1.5", isWhite ? "text-slate-400" : "text-muted-foreground")}>
                                        <Users className="w-3 h-3" />
                                        {broadcast.recipients}
                                    </div>
                                    <button className="text-primary font-semibold hover:underline">View Recipients</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
