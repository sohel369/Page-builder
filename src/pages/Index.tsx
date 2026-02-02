import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BlockPalette } from '@/components/builder/BlockPalette';
import { PageCanvas } from '@/components/builder/PageCanvas';
import { PropertiesPanel } from '@/components/builder/PropertiesPanel';
import { MessagingSystem } from '@/components/MessagingSystem';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { BroadcastPanel } from '@/components/BroadcastPanel';
import { PageManagement } from '@/components/PageManagement';
import DashboardHome from '@/components/DashboardHome';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

import { auth } from '@/lib/firebase';
import { signOut, User } from 'firebase/auth';

interface IndexProps {
  user?: User | null;
}

const Index = ({ user }: IndexProps) => {
  const navigate = useNavigate();
  const [isArabic, setIsArabic] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Dashboard');
  const [userRole, setUserRole] = useState<'admin' | 'moderator'>('admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'white' | 'system'>('dark');
  const [resolvedTheme, setResolvedTheme] = useState('#0B1F3B');

  // Theme resolution logic
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (mode: 'dark' | 'white' | 'system') => {
      let color = '#0B1F3B';
      let isDark = true;

      if (mode === 'white') {
        color = '#FAFAFB';
        isDark = false;
      } else if (mode === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        color = systemDark ? '#0B1F3B' : '#FAFAFB';
        isDark = systemDark;
      } else {
        color = '#0B1F3B';
        isDark = true;
      }

      setResolvedTheme(color);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(themeMode);

    // Listen for system theme changes if in 'system' mode
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderActiveView = () => {
    switch (activeNavItem) {
      case 'Dashboard':
        return <DashboardHome isArabic={isArabic} currentTheme={themeMode} />;
      case 'Page Builder':
        const isWhite = themeMode === 'white';
        return (
          <div className={cn(
            "flex h-[calc(100vh-var(--header-height))] relative overflow-hidden transition-all duration-500",
            isWhite ? "bg-[#FAFAFB]" : "bg-slate-950"
          )}>
            {/* Block Palette - Sidebar on Desktop, Drawer on Mobile */}
            <div className={cn(
              "fixed inset-y-0 left-0 z-50 transition-transform duration-500 md:relative md:translate-x-0 md:z-auto",
              showPalette ? "translate-x-0" : "-translate-x-full"
            )}>
              <BlockPalette isArabic={isArabic} currentTheme={themeMode} />
              <button
                onClick={() => setShowPalette(false)}
                className={cn(
                  "absolute top-4 right-4 md:hidden p-2 rounded-full transition-all",
                  isWhite ? "bg-white text-slate-900 shadow-lg border border-slate-200" : "glass text-white"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex flex-col min-w-0 relative">
              <PageCanvas isArabic={isArabic} currentTheme={themeMode} />

              {/* Mobile Floating Toggles for Builder Panels */}
              <div className="md:hidden fixed bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-40">
                <button
                  onClick={() => setShowPalette(!showPalette)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all shadow-xl",
                    isWhite
                      ? "bg-white text-slate-900 border-slate-200"
                      : "glass text-white border-white/10"
                  )}
                >
                  {isArabic ? 'العناصر' : 'Blocks'}
                </button>
                <button
                  onClick={() => setShowProperties(!showProperties)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all shadow-xl",
                    isWhite
                      ? "bg-white text-slate-900 border-slate-200"
                      : "glass text-white border-white/10"
                  )}
                >
                  {isArabic ? 'الأنماط' : 'Styles'}
                </button>
              </div>
            </div>

            {/* Properties Panel - Sidebar on Desktop, Drawer on Mobile */}
            <div className={cn(
              "fixed inset-y-0 right-0 z-50 transition-transform duration-500 lg:relative lg:translate-x-0 lg:z-auto",
              showProperties ? "translate-x-0" : "translate-x-full"
            )}>
              <PropertiesPanel isArabic={isArabic} currentTheme={themeMode} />
              <button
                onClick={() => setShowProperties(false)}
                className={cn(
                  "absolute top-4 left-4 lg:hidden p-2 rounded-full transition-all",
                  isWhite ? "bg-white text-slate-900 shadow-lg border border-slate-200" : "glass text-white"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {(showPalette || showProperties) && (
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden"
                onClick={() => { setShowPalette(false); setShowProperties(false); }}
              />
            )}
          </div>
        );
      case 'Messages':
        return <MessagingSystem isArabic={isArabic} currentTheme={themeMode} />;
      case 'Pages':
        return <PageManagement isArabic={isArabic} userRole={userRole} currentTheme={themeMode} />;
      case 'Analytics':
        return <AnalyticsDashboard isArabic={isArabic} currentTheme={themeMode} />;
      case 'Broadcasts':
        return <BroadcastPanel isArabic={isArabic} currentTheme={themeMode} />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <p className="text-muted-foreground">{activeNavItem} Section coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "min-h-screen text-foreground transition-all duration-500",
      isArabic ? "rtl" : "ltr"
    )} dir={isArabic ? "rtl" : "ltr"}>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <Sidebar
        isArabic={isArabic}
        activeItem={activeNavItem}
        onItemClick={(label) => {
          setActiveNavItem(label);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTheme={themeMode}
      />

      <div className="relative z-10">
        <Header
          isArabic={isArabic}
          onToggleLanguage={() => setIsArabic(!isArabic)}
          userRole={userRole}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
          user={user}
          onLogout={handleLogout}
          currentTheme={themeMode}
          onThemeChange={(m) => setThemeMode(m as any)}
          resolvedTheme={resolvedTheme}
        />



        <main
          className={cn(
            "pt-header min-h-screen transition-all duration-500",
            isArabic ? "lg:mr-sidebar" : "lg:ml-sidebar"
          )}
          style={{ "--theme-bg": resolvedTheme } as React.CSSProperties}
        >
          <div className="h-[calc(100vh-var(--header-height))]">
            {activeNavItem === 'Messages' ? (
              <MessagingSystem isArabic={isArabic} currentTheme={themeMode} />
            ) : renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
