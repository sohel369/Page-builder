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
}

export function PageManagement({ isArabic = false, userRole = 'admin' }: PageManagementProps) {
    return (
        <div className="p-8 space-y-6 h-full overflow-y-auto animate-fade-in bg-background">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">{isArabic ? 'إدارة الصفحات' : 'Page Management'}</h1>
                    <p className="text-muted-foreground mt-1">
                        {isArabic ? 'إنشاء وتعديل والموافقة على صفحات الموقع' : 'Create, edit, and approve site pages'}
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 gradient-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all">
                    <Plus className="w-5 h-5" />
                    {isArabic ? 'صفحة جديدة' : 'New Page'}
                </button>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-secondary/30">
                            <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Page Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Author</th>
                            <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Views</th>
                            <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {mockPages.map((page) => (
                            <tr key={page.id} className="hover:bg-secondary/20 transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-semibold text-sm group-hover:text-primary transition-colors">{page.title}</p>
                                        <p className="text-xs text-muted-foreground">{page.url}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={cn(
                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                                        page.status === 'published' ? "bg-green-100 text-green-700" :
                                            page.status === 'pending' ? "bg-amber-100 text-amber-700" :
                                                "bg-gray-100 text-gray-700"
                                    )}>
                                        {page.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> :
                                            page.status === 'pending' ? <Clock className="w-3 h-3" /> :
                                                <FileText className="w-3 h-3" />}
                                        {page.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-muted-foreground">{page.author}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium">{page.views}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {userRole === 'admin' && page.status === 'pending' && (
                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors title='Approve Page'">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
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
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-amber-800">Moderator Access</p>
                        <p className="text-xs text-amber-700 mt-1">
                            You can create and edit pages, but publishing requires approval from the Primary Administrator.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
