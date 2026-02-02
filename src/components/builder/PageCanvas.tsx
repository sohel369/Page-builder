import { useState } from 'react';
import {
  GripVertical,
  Settings,
  Trash2,
  Copy,
  Move,
  Sparkles,
  Layout,
  ArrowUpRight,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Eye,
  Rocket,
  Search,
  MousePointer2,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Block {
  id: string;
  type: 'hero' | 'text' | 'image' | 'columns' | 'cta' | 'masonry';
  content?: string;
  items?: string[];
}

const initialBlocks: Block[] = [
  {
    id: '1',
    type: 'hero',
    content: 'The Future of Interface Synthesis'
  },
  {
    id: '2',
    type: 'text',
    content: 'Deploy high-conversion interfaces in seconds with our quantum-grade architecture. Every element is mathematically optimized for buyer psychological engagement.'
  },
  {
    id: '5',
    type: 'masonry',
    items: ['Neural Layouts', 'Glass Engine v2', 'Vector Motion', 'Instant Hydration', 'Atomic Styles', 'Hyper SEO']
  },
  { id: '3', type: 'columns' },
  { id: '4', type: 'cta', content: 'Launch Experience' },
];

interface PageCanvasProps {
  isArabic?: boolean;
  currentTheme?: string;
}

export function PageCanvas({ isArabic = false, currentTheme = 'dark' }: PageCanvasProps) {
  const [blocks] = useState<Block[]>(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState(100);

  const isWhite = currentTheme === 'white';

  const renderBlock = (block: Block) => {
    const isSelected = selectedBlock === block.id;
    const isHovered = hoveredBlock === block.id;

    const wrapperClasses = cn(
      "relative group transition-all duration-500 rounded-3xl",
      isSelected && (isWhite ? "ring-2 ring-primary ring-offset-8 ring-offset-white shadow-2xl" : "ring-2 ring-primary ring-offset-8 ring-offset-background shadow-[0_0_50px_rgba(124,58,237,0.2)]"),
      isHovered && !isSelected && (isWhite ? "ring-1 ring-primary/30 shadow-lg" : "ring-1 ring-primary/30 shadow-xl")
    );

    const toolbarClasses = cn(
      "absolute -top-14 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-2 rounded-2xl border transition-all duration-300 z-[30]",
      isWhite ? "bg-white border-slate-200 shadow-xl" : "glass border border-white/10 shadow-2xl",
      (isSelected || isHovered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
    );

    const BlockToolbar = () => (
      <div className={toolbarClasses}>
        <div className={cn("flex items-center gap-1.5 px-3 mr-2 border-r", isWhite ? "border-slate-100" : "border-white/10")}>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{block.type}</span>
        </div>
        <button className={cn("p-2 rounded-xl transition-all group/btn cursor-grab", isWhite ? "hover:bg-slate-50" : "hover:bg-white/10")}>
          <Move className={cn("w-4 h-4 group-hover/btn:text-primary transition-colors", isWhite ? "text-slate-400" : "text-white/60")} />
        </button>
        <button className={cn("p-2 rounded-xl transition-all group/btn", isWhite ? "hover:bg-slate-50" : "hover:bg-white/10")}>
          <Copy className={cn("w-4 h-4 group-hover/btn:text-primary transition-colors", isWhite ? "text-slate-400" : "text-white/60")} />
        </button>
        <button className={cn("p-2 rounded-xl transition-all group/btn", isWhite ? "hover:bg-slate-50" : "hover:bg-white/10")}>
          <Settings className={cn("w-4 h-4 group-hover/btn:text-primary transition-colors", isWhite ? "text-slate-400" : "text-white/60")} />
        </button>
        <div className={cn("w-px h-5 mx-1", isWhite ? "bg-slate-100" : "bg-white/10")} />
        <button className="p-2 hover:bg-destructive/20 rounded-xl transition-all group/btn text-red-500/60 hover:text-red-500">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );

    switch (block.type) {
      case 'hero':
        return (
          <div
            className={wrapperClasses}
            onClick={() => setSelectedBlock(block.id)}
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            <BlockToolbar />
            <div className={cn(
              "relative overflow-hidden rounded-[2.5rem] border p-20 text-center shadow-2xl group/inner transition-all duration-500",
              isWhite ? "bg-white border-slate-100" : "bg-slate-900 border-white/5"
            )}>
              <div className="absolute inset-0 premium-gradient opacity-10 blur-3xl animate-pulse-slow" />
              <div className={cn(
                "absolute top-0 left-0 w-full h-full opacity-[0.03]",
                isWhite ? "bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)]" : "bg-[radial-gradient(circle_at_center,_var(--white)_1px,_transparent_1px)]"
              )} style={{ backgroundSize: '32px 32px' } as any} />

              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  System Sync Active
                </div>
                <h1 className={cn("text-6xl md:text-7xl font-black px-4 leading-[1.05] tracking-tighter", isWhite ? "text-slate-900" : "text-white")}>
                  {block.content}
                </h1>
                <p className={cn("text-xl max-w-2xl mx-auto leading-relaxed font-medium", isWhite ? "text-slate-500" : "text-white/70")}>
                  {isArabic ? 'صمم واجهاتك المستقبلية باستخدام محركنا الخوارزمي المتقدم' : 'The definitive platform for creating high-conversion, visually stunning digital products at light speed.'}
                </p>
                <div className="flex items-center justify-center gap-4 pt-4">
                  <button className="px-8 py-4 premium-gradient text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">
                    Start Synthesizing
                  </button>
                  <button className={cn(
                    "px-8 py-4 border font-black rounded-2xl transition-all text-sm uppercase tracking-widest",
                    isWhite ? "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100" : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  )}>
                    View Blueprint
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div
            className={wrapperClasses}
            onClick={() => setSelectedBlock(block.id)}
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            <BlockToolbar />
            <div className={cn(
              "p-16 rounded-[2rem] border backdrop-blur-3xl transition-all duration-500",
              isWhite ? "bg-slate-50/50 border-slate-100" : "bg-white/[0.02] border-white/5"
            )}>
              <p className={cn("text-2xl leading-relaxed font-medium tracking-tight", isWhite ? "text-slate-600" : "text-white/70")}>
                {block.content}
              </p>
            </div>
          </div>
        );

      case 'masonry':
        return (
          <div
            className={wrapperClasses}
            onClick={() => setSelectedBlock(block.id)}
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            <BlockToolbar />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {block.items?.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-8 rounded-[2rem] border shadow-2xl transition-all duration-500 hover:-translate-y-2 group/card",
                    i % 3 === 0 ? (isWhite ? "bg-blue-50/50 border-blue-100/50" : "bg-primary/5 border-white/5") :
                      i % 3 === 1 ? (isWhite ? "bg-slate-50 border-slate-100" : "bg-white/[0.03] border-white/5") :
                        (isWhite ? "bg-white border-slate-200" : "bg-slate-900 border-white/5"),
                    "h-64 flex items-end"
                  )}
                >
                  <div className="space-y-4 w-full">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center group-hover/card:scale-110 transition-transform",
                      isWhite ? "bg-primary/10 border border-primary/20" : "premium-gradient/20 border border-primary/20"
                    )}>
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className={cn("font-black text-xl mb-2 uppercase tracking-tight", isWhite ? "text-slate-900" : "text-white")}>{item}</h4>
                      <p className={cn("text-[11px] uppercase font-black tracking-[0.2em]", isWhite ? "text-slate-400" : "text-white/60")}>Engine Module</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'columns':
        return (
          <div
            className={wrapperClasses}
            onClick={() => setSelectedBlock(block.id)}
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            <BlockToolbar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((col) => (
                <div
                  key={col}
                  className={cn(
                    "p-10 rounded-[2.5rem] border group/col hover:border-primary/50 transition-all shadow-2xl",
                    isWhite ? "bg-white border-slate-100 shadow-xl" : "bg-slate-900 border-white/5 shadow-2xl"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover/col:scale-110 transition-transform shadow-inner",
                    isWhite ? "bg-slate-50 border-slate-100" : "bg-white/5 border-white/10"
                  )}>
                    <Layout className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className={cn("text-2xl font-black mb-4 uppercase tracking-tighter", isWhite ? "text-slate-900" : "text-white")}>Module {col}01</h4>
                  <p className={cn("text-base leading-relaxed font-medium italic", isWhite ? "text-slate-500" : "text-white/60")}>
                    Engineered for hyper-scalable deployment and visual dominance.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div
            className={wrapperClasses}
            onClick={() => setSelectedBlock(block.id)}
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            <BlockToolbar />
            <div className="relative text-center p-20 bg-primary rounded-[3rem] overflow-hidden group/cta">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--white)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-10" />
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
              <h3 className="text-4xl font-black text-white mb-8 tracking-tighter relative z-10 leading-tight">
                Ready to dominate <br /> the digital landscape?
              </h3>
              <button className="px-14 py-6 bg-white text-primary font-black rounded-[2rem] hover:scale-110 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)] flex items-center gap-3 mx-auto relative z-10 uppercase tracking-[0.2em] text-sm">
                {block.content}
                <Rocket className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <div className={cn(
      "flex-1 flex flex-col overflow-hidden font-sans transition-all duration-500",
      isWhite ? "bg-slate-50" : "bg-[#020617]"
    )}>
      {/* Upper Control Bar - Ultra Slim & Premium */}
      <div className={cn(
        "h-auto md:h-14 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 md:py-0 backdrop-blur-md border-b z-20 gap-4 md:gap-0 transition-all",
        isWhite ? "bg-white/80 border-slate-100" : "bg-slate-900/20 border-white/[0.03]"
      )}>
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className={cn(
            "flex items-center gap-1 p-1 rounded-xl border shadow-inner transition-all",
            isWhite ? "bg-slate-50 border-slate-200" : "bg-black/40 border-white/5"
          )}>
            {[
              { id: 'desktop', icon: Monitor },
              { id: 'tablet', icon: Tablet },
              { id: 'mobile', icon: Smartphone },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setViewport(v.id as any)}
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewport === v.id
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                    : (isWhite ? "text-slate-400 hover:text-slate-600 hover:bg-white" : "text-white/30 hover:text-white/60 hover:bg-white/5")
                )}
              >
                <v.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <div className={cn("h-4 w-px hidden md:block", isWhite ? "bg-slate-200" : "bg-white/10")} />
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all",
            isWhite ? "bg-slate-50 border-slate-200" : "bg-black/40 border-white/5"
          )}>
            <button onClick={() => setZoom(Math.max(50, zoom - 10))} className={cn("font-black text-sm", isWhite ? "text-slate-400 hover:text-slate-900" : "text-white/60 hover:text-white")}>-</button>
            <span className={cn("text-[10px] font-black w-8 text-center uppercase tracking-widest", isWhite ? "text-slate-600" : "text-white")}>{zoom}%</span>
            <button onClick={() => setZoom(Math.min(150, zoom + 10))} className={cn("font-black text-sm", isWhite ? "text-slate-400 hover:text-slate-900" : "text-white/60 hover:text-white")}>+</button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className={cn("hidden sm:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] mr-4", isWhite ? "text-slate-400" : "text-white/20")}>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Sync</span>
            <div className={cn("w-px h-3", isWhite ? "bg-slate-200" : "bg-white/5")} />
            <span>Dev Mode</span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
              isWhite ? "text-slate-400 hover:text-primary border-slate-200 hover:border-primary/20" : "text-white/40 hover:text-primary border-transparent hover:border-primary/20"
            )}>
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 premium-gradient text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:opacity-90 active:scale-95 transition-all">
              <Rocket className="w-3.5 h-3.5" />
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className={cn(
        "flex-1 overflow-auto relative custom-scrollbar flex items-start justify-center p-4 md:p-12 transition-all duration-500",
        isWhite ? "bg-slate-50" : "bg-[#020617]"
      )}>
        {/* Subtle Background Pattern */}
        <div className={cn(
          "absolute inset-0 [background-size:32px_32px] pointer-events-none transition-all",
          isWhite ? "bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] opacity-40" : "bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-20"
        )} />

        <div
          className={cn(
            "transition-all duration-700 ease-in-out relative",
            viewport === 'desktop' ? "w-full max-w-6xl" :
              viewport === 'tablet' ? "w-[768px]" :
                "w-[390px]"
          )}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          {/* Internal Content Frame - High-End Studio Feel */}
          <div className={cn(
            "min-h-[1200px] overflow-hidden rounded-[3rem] border transition-all",
            isWhite ? "bg-white border-slate-100 shadow-2xl" : "bg-[#020617] border-white/[0.02] shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          )}>

            {/* Canvas Header / Breadcrumb */}
            <div className="p-12 pb-0 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded bg-primary/20 border border-primary/30 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Synthesis Engine</span>
                    <div className={cn("h-px w-10", isWhite ? "bg-slate-100" : "bg-white/20")} />
                    <span className={cn("text-[12px] font-black uppercase tracking-[0.1em]", isWhite ? "text-slate-400" : "text-white/60")}>Workspace / Index</span>
                  </div>
                  <input
                    type="text"
                    defaultValue={isArabic ? "مشروع الواجهة v1.0" : "Quantum Portal Project"}
                    className={cn(
                      "text-6xl font-black bg-transparent border-none focus:outline-none focus:ring-0 tracking-tighter w-full",
                      isWhite ? "text-slate-900" : "text-white"
                    )}
                  />
                </div>
                <div className="text-right pt-4">
                  <p className={cn("text-[11px] font-black uppercase tracking-[0.2em] mb-1", isWhite ? "text-slate-300" : "text-white/50")}>Project Control ID</p>
                  <p className="text-lg font-black text-primary font-mono select-all tracking-wider">PN-9942</p>
                </div>
              </div>
              <div className={cn("h-px w-full", isWhite ? "bg-slate-50" : "bg-gradient-to-r from-white/[0.05] via-transparent to-transparent")} />
            </div>

            {/* Blocks Container */}
            <div className="p-12 pt-16 space-y-24">
              {blocks.map((block) => (
                <div key={block.id} className="animate-fade-in">
                  {renderBlock(block)}
                </div>
              ))}

              {/* Add Block Synthesis Zone - Cinematic Empty State */}
              <div className="relative group/add pt-12">
                <div className="absolute -inset-8 bg-gradient-to-b from-primary/5 to-transparent rounded-[4rem] opacity-0 group-hover/add:opacity-100 transition-all duration-700 blur-3xl" />
                <div className={cn(
                  "relative border-2 border-dashed rounded-[3rem] p-32 text-center transition-all cursor-pointer group active:scale-[0.99] duration-500 overflow-hidden",
                  isWhite ? "border-slate-100 hover:border-primary/40 hover:bg-slate-50" : "border-white/5 hover:border-primary/40 hover:bg-white/[0.01]"
                )}>
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className={cn(
                      "inline-flex items-center justify-center w-28 h-28 rounded-[2.5rem] bg-white/5 group-hover:bg-primary/20 group-hover:scale-110 transition-all mb-8 shadow-inner border group-hover:border-primary/40",
                      isWhite ? "bg-slate-50 border-slate-100" : "bg-white/5 border-white/10"
                    )}>
                      <Plus className={cn("w-12 h-12 transition-colors animate-pulse", isWhite ? "text-slate-200 group-hover:text-primary" : "text-white/40 group-hover:text-primary")} />
                    </div>
                    <h4 className={cn("text-3xl font-black mb-4 italic tracking-tight uppercase", isWhite ? "text-slate-900" : "text-white")}>Inject Atomic Layer</h4>
                    <p className={cn("text-base max-w-md mx-auto font-medium leading-relaxed", isWhite ? "text-slate-400" : "text-white/50")}>
                      {isArabic ? "اسحب عنصراً من المكتبة أو انقر لتوسيع مصفوفة البناء" : "Extraction ready. Deploy a new architectural block from the factory into the synthesis field."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas Footer */}
            <div className="p-20 text-center opacity-20 hover:opacity-40 transition-opacity">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={cn("w-8 h-px", isWhite ? "bg-slate-200" : "bg-white/20")} />
                <Layout className={cn("w-4 h-4", isWhite ? "text-slate-400" : "text-white")} />
                <div className={cn("w-8 h-px", isWhite ? "bg-slate-200" : "bg-white/20")} />
              </div>
              <p className={cn("text-[10px] font-black uppercase tracking-[0.5em]", isWhite ? "text-slate-400" : "text-white")}>End of Transmission</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

