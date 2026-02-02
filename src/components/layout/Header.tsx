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
  Zap
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
}

export function Header({
  isArabic = false,
  onToggleLanguage,
  userRole = 'admin',
  onMenuToggle,
  isMenuOpen,
  user,
  onLogout
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
    <header className={cn(
      "fixed top-0 h-header bg-slate-950 backdrop-blur-xl z-50 flex items-center justify-between px-6 md:px-10 border-b border-white/5",
      isArabic ? "right-0 left-0 lg:right-sidebar" : "left-0 right-0 lg:left-sidebar"
    )}>
      {/* Search & Global Control */}
      <div className="flex items-center gap-6 flex-1">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2.5 rounded-2xl text-white/70 hover:bg-white/10 transition-all border border-white/5"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="hidden lg:flex items-center flex-1 max-w-lg">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={isArabic ? "بحث شامل..." : "Quantum Search..."}
              className="w-full pl-12 pr-6 py-3 bg-white/10 border border-white/20 rounded-[1.25rem] text-sm font-bold text-white placeholder:text-white/50 focus:bg-white/15 focus:border-primary/50 transition-all outline-none shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Synthesis Toolbar (Middle Tools) */}
      <div className="hidden xl:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10 mr-8">
        <button title={isArabic ? 'الإعدادات العامة' : "Global Settings"} className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
          <Settings2 className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-white/20 mx-1" />
        <button title={isArabic ? 'سجل النسخ' : "Version History"} className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
          <History className="w-4 h-4" />
        </button>
        <button title={isArabic ? 'حالة المحرك' : "Core Engine Status"} className="p-2 rounded-xl text-white/70 hover:text-primary hover:bg-primary/10 transition-all">
          <Zap className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-white/20 mx-1" />
        <button title={isArabic ? 'مشاركة' : "Collaborate"} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-sm active:scale-95">
          <Share2 className="w-3.5 h-3.5" />
          {isArabic ? 'مشاركة' : 'Share'}
        </button>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLanguage}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/5 transition-all border border-white/5"
        >
          <Globe className="w-4 h-4" />
          {isArabic ? 'English' : 'Arabic'}
        </button>

        <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

        <button className="relative p-2.5 rounded-2xl text-white/60 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(124,58,237,0.5)] border-2 border-slate-900" />
        </button>

        <div className="flex items-center gap-4 ml-2 group relative" ref={userMenuRef}>
          <div className="hidden lg:block text-right">
            <p className="text-sm font-black text-white tracking-tight leading-none group-hover:text-primary transition-colors">
              {user?.displayName || (isArabic ? 'المصمم' : 'Architect Pro')}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-white/60 justify-end mt-1 font-bold uppercase tracking-[0.2em]">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span>{userRole === 'admin' ? 'Master' : 'Editor'}</span>
            </div>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className={cn(
              "w-11 h-11 rounded-2xl premium-gradient flex items-center justify-center shadow-2xl transition-all overflow-hidden border border-white/20 p-[2px]",
              isUserMenuOpen ? "scale-105" : "hover:scale-105"
            )}>
              <div className="w-full h-full rounded-[inherit] bg-slate-950 flex items-center justify-center overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white/80" />
                )}
              </div>
            </div>

            {/* Dropdown Menu - Refined */}
            <div className={cn(
              "absolute top-[calc(100%+1rem)] right-0 w-72 bg-slate-900/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] py-5 transition-all z-[100] border border-white/10",
              isUserMenuOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-2"
            )}>
              <div className="px-8 py-5 border-b border-white/5 mb-3">
                <p className="text-lg font-black text-white truncate mb-1">
                  {user?.displayName || 'Architect Pro'}
                </p>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">Enterprise</div>
                  <p className="text-xs text-white/40 font-bold truncate opacity-80">{user?.email}</p>
                </div>
              </div>

              <div className="px-3 space-y-1">
                {[
                  { icon: Shield, label: 'Security Portal', ar: 'بوابة الأمان' },
                  { icon: Cloud, label: 'Cloud Storage', ar: 'تخزين سحابي' },
                  { icon: PlusCircle, label: 'Workspace Sync', ar: 'مزامنة العمل' },
                ].map((item, idx) => (
                  <button key={idx} className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black text-white/60 hover:text-white hover:bg-white/5 rounded-2xl transition-all text-left uppercase tracking-widest">
                    <item.icon className="w-4 h-4 text-primary" />
                    {isArabic ? item.ar : item.label}
                  </button>
                ))}

                <div className="h-px bg-white/5 my-2 mx-5" />

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
