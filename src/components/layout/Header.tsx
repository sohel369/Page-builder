import { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Search,
  Globe,
  User,
  Shield,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Settings2,
  Cloud,
  History,
  Share2,
  PlusCircle,
  Command,
  Zap,
  Palette,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  isArabic?: boolean;
  onToggleLanguage?: () => void;
  userRole?: 'admin' | 'moderator';
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  user?: FirebaseUser | null;
  onLogout?: () => void;
  currentTheme?: 'dark' | 'white' | 'system';
  onThemeChange?: (theme: string) => void;
  resolvedTheme?: string;
}

export function Header({
  isArabic = false,
  onToggleLanguage,
  userRole = 'admin',
  onMenuToggle,
  isMenuOpen,
  user,
  onLogout,
  currentTheme = 'dark',
  onThemeChange,
  resolvedTheme = '#0B1F3B'
}: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside or anywhere on body
  useEffect(() => {
    function handleGlobalInteraction(event: MouseEvent | TouchEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    function handleGlobalScroll() {
      if (isUserMenuOpen) setIsUserMenuOpen(false);
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleGlobalInteraction, { capture: true });
      document.addEventListener('touchstart', handleGlobalInteraction, { capture: true });
      window.addEventListener('scroll', handleGlobalScroll, { passive: true, capture: true });

      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        mainContainer.addEventListener('scroll', handleGlobalScroll, { passive: true });
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleGlobalInteraction, { capture: true });
      document.removeEventListener('touchstart', handleGlobalInteraction, { capture: true });
      window.removeEventListener('scroll', handleGlobalScroll, { capture: true });
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        mainContainer.removeEventListener('scroll', handleGlobalScroll);
      }
    };
  }, [isUserMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 h-header backdrop-blur-xl z-50 flex items-center justify-between px-6 md:px-10 border-b transition-all duration-500",
        isArabic ? "right-0 left-0 lg:right-sidebar" : "left-0 right-0 lg:left-sidebar",
        currentTheme === 'white' ? "border-slate-200" : "border-white/5"
      )}
      style={{ backgroundColor: `${resolvedTheme}${resolvedTheme === '#FAFAFB' ? 'CC' : 'E6'}` }}
    >
      {/* Search & Global Control */}
      <div className="flex items-center gap-6 flex-1">
        <button
          onClick={onMenuToggle}
          className={cn(
            "lg:hidden p-2.5 rounded-2xl transition-all border",
            currentTheme === 'white' ? "text-slate-900 border-slate-200 hover:bg-slate-100" : "text-white/70 border-white/5 hover:bg-white/10"
          )}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="hidden lg:flex items-center flex-1 max-w-lg">
          <div className="relative w-full group">
            <Search className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
              currentTheme === 'white' ? "text-slate-400 group-focus-within:text-primary" : "text-white/40 group-focus-within:text-primary"
            )} />
            <input
              type="text"
              placeholder={isArabic ? "بحث شامل..." : "Quantum Search..."}
              className={cn(
                "w-full pl-12 pr-6 py-3 border rounded-[1.25rem] text-sm font-bold transition-all outline-none shadow-inner",
                currentTheme === 'white'
                  ? "bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-primary/50"
                  : "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-primary/50"
              )}
            />
          </div>
        </div>
      </div>

      {/* Synthesis Toolbar (Middle Tools) */}
      <div className={cn(
        "hidden xl:flex items-center gap-1 p-1.5 rounded-2xl border mr-8",
        currentTheme === 'white' ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/10"
      )}>
        <button title={isArabic ? 'الإعدادات العامة' : "Global Settings"} className={cn("p-2 rounded-xl transition-all", currentTheme === 'white' ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200" : "text-white/70 hover:text-white hover:bg-white/10")}>
          <Settings2 className="w-4 h-4" />
        </button>
        <div className={cn("w-px h-4 mx-1", currentTheme === 'white' ? "bg-slate-300" : "bg-white/20")} />
        <button title={isArabic ? 'سجل النسخ' : "Version History"} className={cn("p-2 rounded-xl transition-all", currentTheme === 'white' ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200" : "text-white/70 hover:text-white hover:bg-white/10")}>
          <History className="w-4 h-4" />
        </button>
        <button title={isArabic ? 'حالة المحرك' : "Core Engine Status"} className={cn("p-2 rounded-xl transition-all", currentTheme === 'white' ? "text-slate-600 hover:text-primary hover:bg-primary/5" : "text-white/70 hover:text-primary hover:bg-primary/10")}>
          <Zap className="w-4 h-4" />
        </button>
        <div className={cn("w-px h-4 mx-1", currentTheme === 'white' ? "bg-slate-300" : "bg-white/20")} />
        <button title={isArabic ? 'مشاركة' : "Collaborate"} className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95",
          currentTheme === 'white' ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200" : "text-white/70 hover:text-white hover:bg-white/10"
        )}>
          <Share2 className="w-3.5 h-3.5" />
          {isArabic ? 'مشاركة' : 'Share'}
        </button>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLanguage}
          className={cn(
            "hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border",
            currentTheme === 'white' ? "text-slate-600 border-slate-200 hover:bg-slate-100" : "text-white/60 border-white/5 hover:text-white hover:bg-white/5"
          )}
        >
          <Globe className="w-4 h-4" />
          {isArabic ? 'English' : 'Arabic'}
        </button>

        {/* Theme Dropdown */}
        <div className="relative group/theme flex items-center">
          <button className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl transition-all border",
            currentTheme === 'white' ? "text-slate-600 border-slate-200 bg-slate-100 hover:bg-slate-200" : "text-white/60 border-white/5 bg-white/5 hover:text-white hover:bg-white/5"
          )}>
            {currentTheme === 'dark' && <Moon className="w-4 h-4" />}
            {currentTheme === 'white' && <Sun className="w-4 h-4 text-orange-500" />}
            {currentTheme === 'system' && <Monitor className="w-4 h-4" />}
            <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Theme</span>
            <ChevronDown className="w-3 h-3 transition-transform group-hover/theme:rotate-180" />
          </button>

          <div className={cn(
            "absolute top-[calc(100%+0.5rem)] right-0 w-48 backdrop-blur-3xl rounded-2xl shadow-2xl border py-2 invisible group-hover/theme:visible opacity-0 group-hover/theme:opacity-100 transition-all z-[110] translate-y-2 group-hover/theme:translate-y-0",
            currentTheme === 'white' ? "bg-white/95 border-slate-200" : "bg-slate-900/95 border-white/10"
          )}>
            {[
              { id: 'dark', icon: Moon, name: isArabic ? 'الوضع الداكن' : 'Dark Mode' },
              { id: 'white', icon: Sun, name: isArabic ? 'الوضع الفاتح' : 'Light Mode' },
              { id: 'system', icon: Monitor, name: isArabic ? 'حسب النظام' : 'Match Device' },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange?.(theme.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold transition-all text-left",
                  currentTheme === theme.id
                    ? "text-primary bg-primary/10"
                    : (currentTheme === 'white' ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900" : "text-white/60 hover:text-white hover:bg-white/5")
                )}
              >
                <theme.icon className="w-4 h-4" />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={cn("w-px h-6 mx-1 hidden sm:block", currentTheme === 'white' ? "bg-slate-200" : "bg-white/10")} />

        <button className={cn(
          "relative p-2.5 rounded-2xl transition-all border group",
          currentTheme === 'white' ? "text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20" : "text-white/60 hover:text-primary hover:bg-primary/10 hover:border-primary/20 border-transparent"
        )}>
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(124,58,237,0.5)] border-2 border-slate-900" />
        </button>

        <div className="flex items-center gap-4 ml-2 group relative" ref={userMenuRef}>
          <div className="hidden lg:block text-right">
            <p className={cn(
              "text-sm font-black tracking-tight leading-none group-hover:text-primary transition-colors",
              currentTheme === 'white' ? "text-slate-900" : "text-white"
            )}>
              {user?.displayName || (isArabic ? 'المصمم' : 'Architect Pro')}
            </p>
            <div className={cn(
              "flex items-center gap-1.5 text-[10px] justify-end mt-1 font-bold uppercase tracking-[0.2em]",
              currentTheme === 'white' ? "text-slate-500" : "text-white/60"
            )}>
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span>{userRole === 'admin' ? 'Master' : 'Editor'}</span>
            </div>
          </div>

          <div
            className="relative group/user cursor-pointer"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className={cn(
              "w-11 h-11 rounded-2xl premium-gradient flex items-center justify-center shadow-2xl transition-all overflow-hidden border p-[2px]",
              isUserMenuOpen ? "scale-105" : "hover:scale-105",
              currentTheme === 'white' ? "border-slate-200" : "border-white/20"
            )}>
              <div className={cn(
                "w-full h-full rounded-[inherit] flex items-center justify-center overflow-hidden",
                currentTheme === 'white' ? "bg-white" : "bg-slate-950"
              )}>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className={cn("w-5 h-5", currentTheme === 'white' ? "text-slate-400" : "text-white/80")} />
                )}
              </div>
            </div>

            {/* Dropdown Menu - Refined */}
            <div
              className={cn(
                "absolute top-[calc(100%+1rem)] right-0 w-72 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] py-5 transition-all z-[100] border",
                isUserMenuOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-2",
                currentTheme === 'white' ? "bg-white/95 border-slate-200" : "bg-slate-900/95 border-white/10"
              )}>
              <div className={cn("px-8 py-5 border-b mb-3", currentTheme === 'white' ? "border-slate-100" : "border-white/5")}>
                <p className={cn("text-lg font-black truncate mb-1", currentTheme === 'white' ? "text-slate-900" : "text-white")}>
                  {user?.displayName || 'Architect Pro'}
                </p>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">Enterprise</div>
                  <p className={cn("text-xs font-bold truncate opacity-80", currentTheme === 'white' ? "text-slate-500" : "text-white/40")}>{user?.email}</p>
                </div>
              </div>

              <div className="px-3 space-y-1">
                {[
                  { icon: Shield, label: 'Security Portal', ar: 'بوابة الأمان' },
                  { icon: Cloud, label: 'Cloud Storage', ar: 'تخزين سحابي' },
                  { icon: PlusCircle, label: 'Workspace Sync', ar: 'مزامنة العمل' },
                ].map((item, idx) => (
                  <button key={idx} className={cn(
                    "w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black transition-all text-left uppercase tracking-widest rounded-2xl",
                    currentTheme === 'white' ? "text-slate-500 hover:text-slate-900 hover:bg-slate-100" : "text-white/60 hover:text-white hover:bg-white/5"
                  )}>
                    <item.icon className="w-4 h-4 text-primary" />
                    {isArabic ? item.ar : item.label}
                  </button>
                ))}

                <div className={cn("h-px my-2 mx-5", currentTheme === 'white' ? "bg-slate-100" : "bg-white/5")} />

                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-5 py-4 text-[11px] font-black text-red-500 hover:bg-red-500/10 rounded-2xl transition-all text-left group/logout uppercase tracking-widest"
                >
                  <div className="p-2 rounded-xl bg-red-500/10 group-hover/logout:bg-red-500 group-hover/logout:text-white transition-all">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span>{isArabic ? 'تسجيل الخروج' : 'Log out System'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
}
