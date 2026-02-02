import {
  Sliders,
  Palette,
  Type,
  Layout,
  Sparkles,
  Eye,
  Settings2,
  MousePointer2,
  Box,
  Move,
  Maximize,
  Contrast,
  Zap,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface PropertiesPanelProps {
  isArabic?: boolean;
  currentTheme?: string;
}

const tabs = [
  { id: 'style', icon: Palette, label: 'Visuals', labelAr: 'المرئيات' },
  { id: 'layout', icon: Layout, label: 'Structure', labelAr: 'الهيكل' },
  { id: 'motion', icon: Zap, label: 'Motion', labelAr: 'الحركة' },
  { id: 'advanced', icon: Cpu, label: 'Engine', labelAr: 'المحرك' },
];

export function PropertiesPanel({ isArabic = false, currentTheme = 'dark' }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState('style');
  const isWhite = currentTheme === 'white';

  return (
    <div className={cn(
      "w-80 border-l h-full flex flex-col font-sans overflow-hidden transition-all duration-500",
      isWhite ? "bg-white border-slate-200" : "bg-slate-950 border-white/5"
    )}>
      {/* Header */}
      <div className={cn(
        "p-6 border-b",
        isWhite ? "bg-slate-50/50 border-slate-100" : "bg-slate-900/50 border-white/5"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            <h3 className={cn("font-black text-sm tracking-tight", isWhite ? "text-slate-950" : "text-white")}>
              {isArabic ? 'محرر الخصائص' : 'Element Config'}
            </h3>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
            Live
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={cn(
        "flex p-1 mx-4 mt-4 rounded-xl border transition-all",
        isWhite ? "bg-slate-50 border-slate-100" : "bg-slate-900/30 border-white/5"
      )}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all",
                isActive
                  ? "bg-primary text-white shadow-xl shadow-primary/20"
                  : (isWhite ? "text-slate-400 hover:text-slate-600 hover:bg-white" : "text-white/30 hover:text-white/60 hover:bg-white/5")
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : (isWhite ? "text-slate-300" : "text-white/30"))} />
              <span className="hidden sm:block">{isArabic ? tab.labelAr : tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {activeTab === 'style' && (
          <>
            {/* Typography */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-primary" />
                  <span className={cn("text-[11px] font-black uppercase tracking-widest", isWhite ? "text-slate-400" : "text-white/50")}>Typography</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="group relative">
                  <select className={cn(
                    "w-full pl-4 pr-10 py-3 border rounded-xl text-xs appearance-none focus:ring-2 focus:ring-primary/20 outline-none font-bold transition-all",
                    isWhite ? "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white" : "bg-white/5 border-white/10 text-white"
                  )}>
                    <option>Outfit (Premium)</option>
                    <option>Inter (Modern)</option>
                    <option>Cairo (Arabic)</option>
                    <option>JetBrains Mono</option>
                  </select>
                  <ChevronDown className={cn("absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none", isWhite ? "text-slate-300" : "text-white/20")} />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 space-y-1.5">
                    <span className={cn("text-[9px] font-bold ml-1", isWhite ? "text-slate-300" : "text-white/20")}>SIZE</span>
                    <input
                      type="number"
                      defaultValue="32"
                      className={cn(
                        "w-full px-4 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none font-black transition-all",
                        isWhite ? "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white" : "bg-white/5 border-white/10 text-white"
                      )}
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <span className={cn("text-[9px] font-bold ml-1", isWhite ? "text-slate-300" : "text-white/20")}>WEIGHT</span>
                    <select className={cn(
                      "w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none font-black transition-all",
                      isWhite ? "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white" : "bg-white/5 border-white/10 text-white"
                    )}>
                      <option>900 (Black)</option>
                      <option>700 (Bold)</option>
                      <option>400 (Regular)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Presets */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className={cn("text-[11px] font-black uppercase tracking-widest", isWhite ? "text-slate-400" : "text-white/50")}>Glow & Presets</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Quantum', class: 'premium-gradient' },
                  { name: 'Glass', class: isWhite ? 'bg-slate-50 border-slate-100' : 'glass' },
                  { name: 'Neon', class: 'shadow-[0_0_20px_rgba(139,92,246,0.3)] border-primary/20' },
                  { name: 'Deep', class: isWhite ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-white/5' }
                ].map((preset) => (
                  <button key={preset.name} className={cn(
                    "h-16 rounded-2xl border p-3 flex flex-col justify-end transition-all hover:scale-[1.05] hover:border-primary/50 text-left",
                    preset.class,
                    !preset.class.includes('border-') && (isWhite ? "border-slate-100" : "border-white/5")
                  )}>
                    <span className="text-[9px] font-black text-white uppercase tracking-tighter">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                <span className={cn("text-[11px] font-black uppercase tracking-widest", isWhite ? "text-slate-400" : "text-white/50")}>Color Engine</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#ffffff', '#000000', '#1e293b'].map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "w-10 h-10 rounded-xl border hover:scale-110 transition-transform shadow-lg relative group",
                      isWhite ? "border-slate-100" : "border-white/10"
                    )}
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-primary" />
                <span className={cn("text-[11px] font-black uppercase tracking-widest", isWhite ? "text-slate-400" : "text-white/50")}>Box Model</span>
              </div>

              <div className={cn(
                "p-6 rounded-3xl border relative aspect-square flex items-center justify-center transition-all",
                isWhite ? "bg-slate-50 border-slate-100" : "bg-slate-900/50 border-white/5"
              )}>
                <div className={cn("absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2", isWhite ? "opacity-20" : "opacity-10")}>
                  {[...Array(9)].map((_, i) => <div key={i} className={cn("border rounded-md", isWhite ? "border-slate-300" : "border-white")} />)}
                </div>
                <div className="w-32 h-32 border-2 border-primary/30 border-dashed rounded-2xl flex items-center justify-center relative">
                  <div className={cn("absolute -top-3 left-1/2 -translate-x-1/2 px-2 text-[8px] font-black text-primary", isWhite ? "bg-white" : "bg-slate-950")}>MARGIN</div>
                  <div className="w-20 h-20 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center">
                    <span className={cn("text-[8px] font-black", isWhite ? "text-primary/40" : "text-white/40")}>PADDING</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Auto Gap', icon: Maximize },
                  { label: 'Flex Fit', icon: Contrast },
                ].map((opt) => (
                  <button key={opt.label} className={cn(
                    "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all",
                    isWhite ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-900" : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  )}>
                    <opt.icon className={cn("w-4 h-4", isWhite ? "text-slate-300" : "text-white/40")} />
                    <span className="text-[9px] font-black uppercase">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="space-y-4 text-center py-10 opacity-40">
              <Cpu className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
              <p className={cn("text-xs font-black uppercase tracking-[0.2em]", isWhite ? "text-slate-900" : "text-white")}>Quantum Engine Active</p>
              <p className={cn("text-[10px] font-medium px-4", isWhite ? "text-slate-500" : "text-white/60")}>The algorithmic layout engine is automatically optimizing this element for across 4 viewports.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Contrast className="w-4 h-4 text-primary" />
                <span className={cn("text-[11px] font-black uppercase tracking-widest", isWhite ? "text-slate-400" : "text-white/50")}>Custom Logic</span>
              </div>
              <textarea
                placeholder="/* Standard CSS or Tailwind utilities */"
                className={cn(
                  "w-full h-40 border rounded-2xl p-4 text-[10px] font-mono outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  isWhite ? "bg-slate-50 border-slate-200 text-slate-900 focus:bg-white" : "bg-slate-900 border-white/10 text-primary"
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className={cn(
        "p-6 border-t mt-auto transition-all",
        isWhite ? "bg-slate-50/50 border-slate-100" : "bg-slate-900/50 border-white/5"
      )}>
        <button className="w-full py-4.5 premium-gradient text-white font-black rounded-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          Apply Strategy
          <Zap className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ChevronDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

