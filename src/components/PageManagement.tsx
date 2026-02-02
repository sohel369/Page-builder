import { useState } from 'react';
import { FileText, MoreVertical, Eye, Edit3, Trash2, CheckCircle2, Clock, ShieldAlert, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Page {
    id: string;
    title: string;
    url: string;
    status: 'published' | 'pending' | 'draft';
    author: string;
    lastEdited: string;
    views: string;
}

const mockPages: Page[] = [
    { id: '1', title: 'Home Page', url: '/home', status: 'published', author: 'Admin', lastEdited: '2 hours ago', views: '12.4k' },
    { id: '2', title: 'Product Catalog', url: '/products', status: 'published', author: 'Zaid A.', lastEdited: '5 hours ago', views: '8.2k' },
    { id: '3', title: 'Summer Campaign', url: '/summer-2024', status: 'pending', author: 'Sarah W. (Moderator)', lastEdited: '1 hour ago', views: '0' },
    { id: '4', title: 'Contact Us', url: '/contact', status: 'draft', author: 'Admin', lastEdited: 'Yesterday', views: '0' },
];

interface PageManagementProps {
    isArabic?: boolean;
    userRole?: 'admin' | 'moderator';
    currentTheme?: string;
}

export function PageManagement({ isArabic = false, userRole = 'admin', currentTheme = 'dark' }: PageManagementProps) {
    const isWhite = currentTheme === 'white';

    return (
        <div className={cn(
            "p-8 space-y-6 h-full overflow-y-auto animate-fade-in transition-all duration-500",
            isWhite ? "bg-[#FAFAFB]" : "bg-transparent"
        )}>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className={cn("text-2xl font-bold transition-colors", isWhite ? "text-slate-950" : "text-white")}>
                        {isArabic ? 'إدارة الصفحات' : 'Page Management'}
                    </h1>
                    <p className={cn("mt-1 transition-colors", isWhite ? "text-slate-500" : "text-muted-foreground")}>
                        {isArabic ? 'إنشاء وتعديل والموافقة على صفحات الموقع' : 'Create, edit, and approve site pages'}
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 premium-gradient text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95">
                    <Plus className="w-5 h-5" />
                    {isArabic ? 'صفحة جديدة' : 'New Page'}
                </button>
            </div>

            <div className={cn(
                "rounded-2xl border overflow-hidden shadow-sm transition-all",
                isWhite ? "bg-white border-slate-200" : "bg-card border-border"
            )}>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={cn(
                            "border-b transition-all",
                            isWhite ? "bg-slate-50 border-slate-100" : "bg-secondary/30 border-border"
                        )}>
                            <th className={cn("px-6 py-4 text-xs font-semibold uppercase tracking-wider", isWhite ? "text-slate-400" : "text-muted-foreground")}>Page Title</th>
                            <th className={cn("px-6 py-4 text-xs font-semibold uppercase tracking-wider", isWhite ? "text-slate-400" : "text-muted-foreground")}>Status</th>
                            <th className={cn("px-6 py-4 text-xs font-semibold uppercase tracking-wider", isWhite ? "text-slate-400" : "text-muted-foreground")}>Author</th>
                            <th className={cn("px-6 py-4 text-xs font-semibold uppercase tracking-wider", isWhite ? "text-slate-400" : "text-muted-foreground")}>Views</th>
                            <th className={cn("px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right", isWhite ? "text-slate-400" : "text-muted-foreground")}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={cn("divide-y transition-all", isWhite ? "divide-slate-100" : "divide-border")}>
                        {mockPages.map((page) => (
                            <tr key={page.id} className={cn(
                                "transition-colors group",
                                isWhite ? "hover:bg-slate-50/50" : "hover:bg-secondary/20"
                            )}>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className={cn("font-semibold text-sm group-hover:text-primary transition-colors", isWhite ? "text-slate-900" : "text-white")}>{page.title}</p>
                                        <p className={cn("text-xs transition-colors", isWhite ? "text-slate-400" : "text-muted-foreground")}>{page.url}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={cn(
                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all",
                                        page.status === 'published' ? (isWhite ? "bg-green-50 text-green-600" : "bg-green-100/10 text-green-500") :
                                            page.status === 'pending' ? (isWhite ? "bg-amber-50 text-amber-600" : "bg-amber-100/10 text-amber-500") :
                                                (isWhite ? "bg-slate-50 text-slate-500" : "bg-gray-100/10 text-gray-400")
                                    )}>
                                        {page.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> :
                                            page.status === 'pending' ? <Clock className="w-3 h-3" /> :
                                                <FileText className="w-3 h-3" />}
                                        {page.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn("text-sm transition-colors", isWhite ? "text-slate-500" : "text-muted-foreground")}>{page.author}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn("text-sm font-medium transition-colors", isWhite ? "text-slate-900" : "text-white")}>{page.views}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {userRole === 'admin' && page.status === 'pending' && (
                                            <button className={cn(
                                                "p-2 rounded-lg transition-colors",
                                                isWhite ? "text-green-600 hover:bg-green-50" : "text-green-500 hover:bg-green-500/10"
                                            )} title="Approve Page">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            isWhite ? "text-slate-400 hover:text-slate-600 hover:bg-slate-100" : "text-muted-foreground hover:bg-secondary"
                                        )}>
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            isWhite ? "text-slate-400 hover:text-slate-600 hover:bg-slate-100" : "text-muted-foreground hover:bg-secondary"
                                        )}>
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            isWhite ? "text-slate-400 hover:text-red-600 hover:bg-red-50" : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                        )}>
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {userRole === 'moderator' && (
                <div className={cn(
                    "p-4 border rounded-xl flex items-start gap-3 transition-all",
                    isWhite ? "bg-amber-50 border-amber-100" : "bg-amber-500/5 border-amber-500/20"
                )}>
                    <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                        <p className={cn("text-sm font-semibold transition-colors", isWhite ? "text-amber-900" : "text-amber-200")}>Moderator Access</p>
                        <p className={cn("text-xs mt-1 transition-colors", isWhite ? "text-amber-700/80" : "text-amber-200/60")}>
                            You can create and edit pages, but publishing requires approval from the Primary Administrator.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
