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
}

export function BroadcastPanel({ isArabic = false }: BroadcastPanelProps) {
    const [selectedType, setSelectedType] = useState<'info' | 'warning' | 'critical'>('info');

    return (
        <div className="p-8 space-y-8 h-full overflow-y-auto animate-fade-in bg-background">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Megaphone className="w-7 h-7 text-primary" />
                        {isArabic ? 'بث التنبيهات' : 'Broadcast Center'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isArabic ? 'إرسال تنبيهات فورية لجميع المشرفين' : 'Send instant alerts to all administrators'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* New Broadcast Form */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="font-semibold mb-6 flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {isArabic ? 'إنشاء بث جديد' : 'Compose New Broadcast'}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Alert Type</label>
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
                                                : "bg-secondary/50 border-transparent text-muted-foreground hover:bg-secondary"
                                        )}
                                    >
                                        {type.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Recipients</label>
                            <select className="w-full bg-secondary/50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary">
                                <option>All Administrators</option>
                                <option>Only Primary Admins</option>
                                <option>Only Moderators</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Alert Title</label>
                            <input
                                type="text"
                                placeholder="Brief summary of the alert..."
                                className="w-full bg-secondary/50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1.5 block">Message Content</label>
                            <textarea
                                rows={4}
                                placeholder="Detailed message for administrators..."
                                className="w-full bg-secondary/50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary resize-none"
                            />
                        </div>

                        <button className="w-full py-3 gradient-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                            <Megaphone className="w-4 h-4" />
                            Send Broadcast
                        </button>
                    </div>
                </div>

                {/* Recent Broadcasts */}
                <div className="space-y-6">
                    <h3 className="font-semibold flex items-center gap-2">
                        <History className="w-4 h-4" />
                        Recent Broadcasts
                    </h3>
                    <div className="space-y-4">
                        {recentBroadcasts.map((broadcast) => (
                            <div key={broadcast.id} className="bg-card p-5 rounded-xl border border-border shadow-sm group hover:border-primary/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "w-2 h-2 rounded-full",
                                            broadcast.type === 'info' ? "bg-blue-500" :
                                                broadcast.type === 'warning' ? "bg-amber-500" :
                                                    "bg-red-500"
                                        )} />
                                        <h4 className="font-semibold text-sm">{broadcast.title}</h4>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{broadcast.timestamp}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                    {broadcast.message}
                                </p>
                                <div className="flex justify-between items-center text-[10px] pt-3 border-t border-border">
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
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
