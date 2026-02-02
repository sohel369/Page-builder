import {
  Type,
  Image,
  Square,
  Columns,
  Video,
  FormInput,
  CreditCard,
  BarChart,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Wallet,
  Search,
  MousePointer2,
  Table,
  Layers,
  Zap,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BlockType {
  icon: React.ElementType;
  label: string;
  labelAr: string;
  category: string;
  description: string;
  descriptionAr: string;
}

const blocks: BlockType[] = [
  { icon: Type, label: 'Text Block', labelAr: 'كتلة نصية', category: 'Content', description: 'Rich text & headings', descriptionAr: 'نصوص عناوين' },
  { icon: Image, label: 'Visual', labelAr: 'مرئي', category: 'Content', description: 'Images & Galleries', descriptionAr: 'صور ومعارض' },
  { icon: Video, label: 'Media', labelAr: 'وسائط', category: 'Content', description: 'Video embeds', descriptionAr: 'فيديو' },
  { icon: Box, label: 'Section', labelAr: 'قسم', category: 'Layout', description: 'Full width container', descriptionAr: 'حاوية كاملة' },
  { icon: Columns, label: 'Grid', labelAr: 'شبكة', category: 'Layout', description: 'Multi-column layout', descriptionAr: 'تخطيط أعمدة' },
  { icon: FormInput, label: 'Smart Form', labelAr: 'نموذج ذكي', category: 'Interactive', description: 'Lead capture forms', descriptionAr: 'نماذج التقاط' },
  { icon: CreditCard, label: 'Checkout', labelAr: 'دفع', category: 'Commerce', description: 'Payment processing', descriptionAr: 'معالجة الدفع' },
  { icon: ShieldCheck, label: 'Bank Link', labelAr: 'ربط البنك', category: 'Commerce', description: 'Direct API sync', descriptionAr: 'مزامنة مباشرة' },
  { icon: BarChart, label: 'Insight', labelAr: 'بصيرة', category: 'Data', description: 'Dynamic charts', descriptionAr: 'رسوم بيانية' },
  { icon: MessageCircle, label: 'Live Chat', labelAr: 'دردشة', category: 'Interactive', description: 'Real-time support', descriptionAr: 'دعم مباشر' },
  { icon: Sparkles, label: 'FX Layer', labelAr: 'تأثيرات', category: 'Advanced', description: 'Glows & Particles', descriptionAr: 'توهج وجزيئات' },
  { icon: Zap, label: 'Action', labelAr: 'إجراء', category: 'Advanced', description: 'Automated macros', descriptionAr: 'ماكرو تلقائي' },
];

interface BlockPaletteProps {
  isArabic?: boolean;
  currentTheme?: string;
}

export function BlockPalette({ isArabic = false, currentTheme = 'dark' }: BlockPaletteProps) {
  const [search, setSearch] = useState('');
  const isWhite = currentTheme === 'white';
  const categories = [...new Set(blocks.map(b => b.category))];

  const filteredBlocks = blocks.filter(b =>
    b.label.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={cn(
      "w-80 border-r h-full flex flex-col font-sans transition-all duration-500",
      isWhite ? "bg-white border-slate-200" : "bg-slate-950 border-white/5"
    )}>
      <div className={cn("p-6 border-b", isWhite ? "border-slate-100" : "border-white/5")}>
        <h3 className={cn("font-black text-lg tracking-tight mb-4 flex items-center gap-2", isWhite ? "text-slate-900" : "text-white")}>
          <Layers className="w-5 h-5 text-primary" />
          {isArabic ? 'مكتبة العناصر' : 'Block Factory'}
        </h3>

        <div className="relative group">
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", isWhite ? "text-slate-300 group-focus-within:text-primary" : "text-white/30 group-focus-within:text-primary")} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? 'ابحث عن عناصر...' : 'Find components...'}
            className={cn(
              "w-full pl-10 pr-4 py-2 border rounded-xl text-xs transition-all font-medium outline-none",
              isWhite ? "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/10" : "bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary/20"
            )}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
        {categories.map((category) => {
          const categoryBlocks = filteredBlocks.filter(b => b.category === category);
          if (categoryBlocks.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", isWhite ? "text-slate-400" : "text-white/40")}>
                  {category}
                </p>
                <div className={cn("h-px flex-1 mx-3", isWhite ? "bg-slate-100" : "bg-white/5")} />
              </div>

              <div className="grid grid-cols-1 gap-2">
                {categoryBlocks.map((block) => {
                  const Icon = block.icon;
                  return (
                    <button
                      key={block.label}
                      draggable
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-grab active:cursor-grabbing text-left group",
                        isWhite
                          ? "bg-white border-slate-100 hover:border-primary/30 hover:shadow-lg"
                          : "bg-white/5 border-transparent hover:bg-white/[0.08] hover:border-white/10 hover:shadow-xl",
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-xl border group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-inner",
                        isWhite ? "bg-slate-50 border-slate-100" : "bg-slate-900 border-white/5"
                      )}>
                        <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0 py-0.5">
                        <span className={cn("block text-xs font-black transition-colors group-hover:text-primary", isWhite ? "text-slate-900" : "text-white")}>
                          {isArabic ? block.labelAr : block.label}
                        </span>
                        <span className={cn("block text-[10px] font-bold mt-1 tracking-wide uppercase", isWhite ? "text-slate-400" : "text-white/30")}>
                          {isArabic ? block.descriptionAr : block.description}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MousePointer2 className={cn("w-4 h-4", isWhite ? "text-slate-200" : "text-white/20")} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

