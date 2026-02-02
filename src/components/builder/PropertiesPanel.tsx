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
}

const tabs = [
  { id: 'style', icon: Palette, label: 'Visuals', labelAr: 'المرئيات' },
  { id: 'layout', icon: Layout, label: 'Structure', labelAr: 'الهيكل' },
  { id: 'motion', icon: Zap, label: 'Motion', labelAr: 'الحركة' },
  { id: 'advanced', icon: Cpu, label: 'Engine', labelAr: 'المحرك' },
];

export function PropertiesPanel({ isArabic = false }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState('style');

  return (
    <div className="w-80 bg-slate-950 border-l border-white/5 h-full flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            <h3 className="font-black text-sm tracking-tight text-white">
              {isArabic ? 'محرر الخصائص' : 'Element Config'}
            </h3>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
            Live
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-900/30 p-1 mx-4 mt-4 rounded-xl border border-white/5">
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
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-white/30")} />
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
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Typography</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="group relative">
                  <select className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white appearance-none focus:ring-2 focus:ring-primary/20 outline-none font-bold">
                    <option>Outfit (Premium)</option>
                    <option>Inter (Modern)</option>
                    <option>Cairo (Arabic)</option>
                    <option>JetBrains Mono</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[9px] font-bold text-white/20 ml-1">SIZE</span>
                    <input
                      type="number"
                      defaultValue="32"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-primary/20 outline-none font-black"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[9px] font-bold text-white/20 ml-1">WEIGHT</span>
                    <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-primary/20 outline-none font-black">
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
                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Glow & Presets</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Quantum', class: 'premium-gradient' },
                  { name: 'Glass', class: 'glass' },
                  { name: 'Neon', class: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]' },
                  { name: 'Deep', class: 'bg-slate-900 border-white/5' }
                ].map((preset) => (
                  <button key={preset.name} className={cn(
                    "h-16 rounded-2xl border border-white/5 p-3 flex flex-col justify-end transition-all hover:scale-[1.05] hover:border-primary/50 text-left",
                    preset.class
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
                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Color Engine</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#ffffff', '#000000', '#1e293b'].map((color) => (
                  <button
                    key={color}
                    className="w-10 h-10 rounded-xl border border-white/10 hover:scale-110 transition-transform shadow-lg relative group"
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
                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Box Model</span>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 relative aspect-square flex items-center justify-center">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 opacity-10 p-2">
                  {[...Array(9)].map((_, i) => <div key={i} className="border border-white rounded-md" />)}
                </div>
                <div className="w-32 h-32 border-2 border-primary/30 border-dashed rounded-2xl flex items-center justify-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 px-2 text-[8px] font-black text-primary">MARGIN</div>
                  <div className="w-20 h-20 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center">
                    <span className="text-[8px] font-black text-white/40">PADDING</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Auto Gap', icon: Maximize },
                  { label: 'Flex Fit', icon: Contrast },
                ].map((opt) => (
                  <button key={opt.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 hover:bg-white/10 transition-all">
                    <opt.icon className="w-4 h-4 text-white/40" />
                    <span className="text-[9px] font-black text-white uppercase">{opt.label}</span>
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
              <p className="text-xs font-black text-white uppercase tracking-[0.2em]">Quantum Engine Active</p>
              <p className="text-[10px] text-white/60 font-medium px-4">The algorithmic layout engine is automatically optimizing this element for across 4 viewports.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Contrast className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Custom Logic</span>
              </div>
              <textarea
                placeholder="/* Standard CSS or Tailwind utilities */"
                className="w-full h-40 bg-slate-900 border border-white/10 rounded-2xl p-4 text-[10px] font-mono text-primary outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/5 bg-slate-900/50 mt-auto">
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

