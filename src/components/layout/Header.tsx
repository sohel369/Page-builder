import { Bell, Search, Globe, User, Shield, Menu, X, LogOut, ChevronDown } from 'lucide-react';
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
  return (
    <header className={cn(
      "fixed top-0 right-0 h-header glass z-40 flex items-center justify-between px-6 md:px-8",
      isArabic ? "left-0 lg:right-sidebar" : "lg:left-sidebar right-0"
    )}>
      {/* Search & Menu */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-white/5 transition-all"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden sm:flex items-center flex-1 max-w-md">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={isArabic ? "بحث..." : "Quantum Search..."}
              className="w-full pl-12 pr-4 py-2.5 bg-background/50 border border-white/5 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-white/5 transition-all border border-transparent hover:border-primary/20"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden md:inline">{isArabic ? 'English' : 'Arabic'}</span>
        </button>

        <button className="relative p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-white/5 transition-all group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
        </button>

        <div className="h-8 w-px bg-white/5 mx-2" />

        <div className="flex items-center gap-3 pl-2 group relative">
          <div className="hidden md:block text-right">
            <p className="text-sm font-black text-foreground leading-none">
              {user?.displayName || (isArabic ? 'المستخدم' : 'Architect')}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground justify-end mt-1 font-bold uppercase tracking-wider">
              <Shield className="w-2.5 h-2.5 text-primary" />
              <span>{userRole === 'admin' ? 'Master' : 'Editor'}</span>
            </div>
          </div>

          <div className="relative group/user cursor-pointer">
            <div className="w-10 h-10 rounded-2xl premium-gradient flex items-center justify-center shadow-xl group-hover/user:scale-110 transition-transform overflow-hidden border border-white/20">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-[calc(100%+0.75rem)] right-0 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-4 invisible group-hover/user:visible opacity-0 group-hover/user:opacity-100 transition-all z-[100] animate-slide-up border border-white/20">
              <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 mb-2">
                <p className="text-base font-black text-foreground truncate">{user?.displayName || 'Architect'}</p>
                <p className="text-xs text-muted-foreground font-semibold truncate mt-0.5 opacity-80">{user?.email}</p>
              </div>
              <div className="px-2">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-red-500 hover:bg-red-500/10 rounded-2xl transition-all text-left group/logout"
                >
                  <div className="p-2 rounded-xl bg-red-500/10 group-hover/logout:bg-red-500 group-hover/logout:text-white transition-all">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span>Log out System</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

