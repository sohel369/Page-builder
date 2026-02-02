import { useState } from 'react';
import {
  LayoutGrid,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  Plus,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  labelAr: string;
  badge?: number;
  children?: { label: string; labelAr: string }[];
}

const navItems: NavItem[] = [
  { icon: LayoutGrid, label: 'Dashboard', labelAr: 'لوحة التحكم' },
  {
    icon: FileText,
    label: 'Pages',
    labelAr: 'الصفحات',
    children: [
      { label: 'All Pages', labelAr: 'كل الصفحات' },
      { label: 'Templates', labelAr: 'القوالব' },
      { label: 'Drafts', labelAr: 'المسودات' },
    ]
  },
  { icon: Zap, label: 'Page Builder', labelAr: 'منشئ الصفحات' },
  { icon: Users, label: 'Team', labelAr: 'الفريق' },
  { icon: MessageSquare, label: 'Messages', labelAr: 'الرسائل', badge: 3 },
  { icon: BarChart3, label: 'Analytics', labelAr: 'التحليلات' },
  { icon: Bell, label: 'Broadcasts', labelAr: 'البث' },
  { icon: Settings, label: 'Settings', labelAr: 'الإعدادات' },
];

interface SidebarProps {
  isArabic?: boolean;
  activeItem?: string;
  onItemClick?: (label: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  currentTheme?: string;
}

export function Sidebar({
  isArabic = false,
  activeItem = 'Dashboard',
  onItemClick,
  isOpen = false,
  onClose,
  currentTheme = 'dark'
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Pages']);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isWhite = currentTheme === 'white';

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[45] lg:hidden backdrop-blur-md animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed top-0 h-screen w-sidebar flex flex-col z-50 transition-all duration-500 ease-in-out border-r",
        isArabic ? "right-0" : "left-0",
        !isOpen && (isArabic ? "translate-x-full" : "-translate-x-full"),
        "lg:translate-x-0",
        isWhite ? "bg-[#FAFAFB] border-slate-200" : "bg-slate-950 border-white/5"
      )}>
        {/* Logo Section */}
        <div className={cn("h-header flex items-center px-6 border-b", isWhite ? "border-slate-100" : "border-white/5")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={cn("font-black text-xl tracking-tight font-outfit", isWhite ? "text-slate-900" : "text-white")}>
                {isArabic ? 'בანი الصفحات' : 'PageWeaver'}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Studio Pro</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Status / Pro Badge */}
        <div className="p-4">
          <div className={cn(
            "p-4 rounded-2xl border flex items-center gap-3 group cursor-pointer transition-all",
            isWhite ? "bg-white border-slate-200 hover:bg-slate-50 shadow-sm" : "glass border-white/10 hover:bg-white/5"
          )}>
            <div className="w-8 h-8 rounded-full premium-gradient flex items-center justify-center shadow-inner">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-xs font-black uppercase tracking-wider", isWhite ? "text-slate-900" : "text-white/90")}>Enterprise Tier</p>
              <p className={cn("text-[10px] font-bold truncate", isWhite ? "text-slate-500" : "text-white/50")}>Premium Access Enabled</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-2 px-3 overflow-y-auto space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            const isExpanded = expandedItems.includes(item.label);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleExpand(item.label);
                    } else {
                      onItemClick?.(item.label);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group relative",
                    isActive
                      ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                      : (isWhite ? "text-slate-600 hover:text-primary hover:bg-primary/5" : "text-slate-400 hover:text-white hover:bg-white/5")
                  )}
                >
                  <Icon className={cn("w-5 h-5 flex-shrink-0 transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                  <span className="flex-1 text-left tracking-wide">{isArabic ? item.labelAr : item.label}</span>
                  {item.badge && !isActive && (
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-lg bg-primary text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {hasChildren && (
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isExpanded && "rotate-180"
                    )} />
                  )}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full shadow-[0_0_10px_white]" />
                  )}
                </button>

                {hasChildren && isExpanded && (
                  <div className="mt-1 ml-9 space-y-1 animate-slide-up">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => {
                          if (child.label === 'All Pages') onItemClick?.('Pages');
                          else onItemClick?.(child.label);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-xs rounded-xl font-bold transition-all border-l ml-1",
                          (activeItem === child.label || (child.label === 'All Pages' && activeItem === 'Pages'))
                            ? "text-primary bg-primary/5 border-primary/20"
                            : (isWhite ? "text-slate-500 hover:text-primary hover:bg-primary/5 border-slate-100" : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border-white/5")
                        )}
                      >
                        {isArabic ? child.labelAr : child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Action */}
        <div className={cn("p-4 mt-auto border-t", isWhite ? "border-slate-100" : "border-white/5")}>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl premium-gradient text-white font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl uppercase tracking-[0.1em]">
            <Plus className="w-5 h-5" />
            {isArabic ? 'صفحة جديدة' : 'Instant Build'}
          </button>
        </div>
      </aside>
    </>
  );
}

