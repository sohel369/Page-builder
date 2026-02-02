import { useState, useEffect, useRef } from 'react';
import {
    Search,
    Send,
    User,
    MoreVertical,
    CheckCheck,
    Clock,
    MessageSquare,
    Phone,
    Video,
    ArrowLeft,
    Paperclip,
    Smile,
    Image as ImageIcon,
    Mic
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    sender: string;
    role: 'admin' | 'visitor' | 'moderator';
    content: string;
    timestamp: string;
    isRead: boolean;
    isMe: boolean;
}

interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
    online: boolean;
    role: string;
    avatarBg: string;
    messages: Message[];
}

const initialChats: Chat[] = [
    {
        id: '1',
        name: 'Zaid Al-Harbi',
        lastMessage: 'Let me know when it\'s ready.',
        lastMessageTime: '10:45 AM',
        unread: 2,
        online: true,
        role: 'Moderator',
        avatarBg: 'bg-purple-500',
        messages: [
            { id: '1', sender: 'Zaid Al-Harbi', role: 'moderator', content: 'The new landing page looks great, but we should refine the hero section effects.', timestamp: '10:45 AM', isRead: true, isMe: false },
            { id: '2', sender: 'Me', role: 'admin', content: 'I agree. I will add some glassmorphism effects to the hero block.', timestamp: '10:47 AM', isRead: true, isMe: true },
            { id: '3', sender: 'Zaid Al-Harbi', role: 'moderator', content: 'Perfect. Let me know when it\'s ready for approval.', timestamp: '10:48 AM', isRead: false, isMe: false },
        ]
    },
    {
        id: '2',
        name: 'Sarah Wilson',
        lastMessage: 'The bank integration is done.',
        lastMessageTime: '09:30 AM',
        unread: 0,
        online: false,
        role: 'Lead Developer',
        avatarBg: 'bg-blue-500',
        messages: [
            { id: '1', sender: 'Sarah Wilson', role: 'moderator', content: 'Hey, I just finished the stripe integration.', timestamp: '09:25 AM', isRead: true, isMe: false },
            { id: '2', sender: 'Me', role: 'admin', content: 'Awesome! I will check it in the staging environment.', timestamp: '09:30 AM', isRead: true, isMe: true },
        ]
    },
    {
        id: '3',
        name: 'John Doe',
        lastMessage: 'Is the pricing flexible?',
        lastMessageTime: 'Yesterday',
        unread: 1,
        online: true,
        role: 'Visitor',
        avatarBg: 'bg-green-500',
        messages: [
            { id: '1', sender: 'John Doe', role: 'visitor', content: 'Hello, I have a question about the Enterprise plan.', timestamp: 'Yesterday', isRead: true, isMe: false },
            { id: '2', sender: 'Me', role: 'admin', content: 'Sure John, how can I help you?', timestamp: 'Yesterday', isRead: true, isMe: true },
            { id: '3', sender: 'John Doe', role: 'visitor', content: 'Is the pricing flexible for startups?', timestamp: 'Yesterday', isRead: true, isMe: false },
        ]
    },
];

interface MessagingSystemProps {
    isArabic?: boolean;
    currentTheme?: string;
}

export function MessagingSystem({ isArabic = false, currentTheme = '#0B1F3B' }: MessagingSystemProps) {
    const [chats, setChats] = useState<Chat[]>(initialChats);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selectedChat = chats.find(c => c.id === selectedChatId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedChat?.messages]);

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedChatId) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'Me',
            role: 'admin',
            content: messageInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false,
            isMe: true
        };

        setChats(prevChats => prevChats.map(chat => {
            if (chat.id === selectedChatId) {
                return {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    lastMessage: messageInput,
                    lastMessageTime: 'Just now'
                };
            }
            return chat;
        }));

        setMessageInput('');

        // Fake auto-response for demo
        setTimeout(() => {
            const autoResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: selectedChat?.name || 'User',
                role: (selectedChat?.role.toLowerCase() as any) || 'visitor',
                content: 'Thanks for your message! This is an automated demo response.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isRead: false,
                isMe: false
            };

            setChats(prevChats => prevChats.map(chat => {
                if (chat.id === selectedChatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, autoResponse],
                        lastMessage: autoResponse.content,
                        lastMessageTime: 'Just now'
                    };
                }
                return chat;
            }));
        }, 1500);
    };

    return (
        <div
            className="flex h-full overflow-hidden animate-fade-in relative shadow-2xl"
            style={{ backgroundColor: currentTheme }}
        >
            {/* Sidebar - Chat List */}
            <div className={cn(
                "w-full md:w-96 flex flex-col border-white/5 transition-all duration-300",
                isArabic ? "border-l" : "border-r",
                selectedChatId ? "hidden md:flex" : "flex"
            )} style={{ backgroundColor: currentTheme }}>
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-black text-white mb-4 tracking-tight">
                        {isArabic ? 'الرسائل' : 'Messages'}
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder={isArabic ? 'البحث عن المحادثات...' : 'Search messages...'}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 rounded-2xl text-sm border border-white/5 focus:ring-1 focus:ring-primary/50 outline-none text-white transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => {
                                setSelectedChatId(chat.id);
                                // Mark as read locally in demo
                                setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
                            }}
                            className={cn(
                                "w-full p-4 flex gap-4 transition-all hover:bg-white/5 border-l-4 border-transparent",
                                selectedChatId === chat.id && "bg-white/5 border-primary shadow-2xl"
                            )}
                        >
                            <div className="relative flex-shrink-0">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-inner",
                                    chat.avatarBg || "premium-gradient"
                                )}>
                                    {chat.name[0]}
                                </div>
                                {chat.online && (
                                    <div
                                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                        style={{ borderColor: currentTheme }}
                                    />
                                )}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-sm text-white truncate">{chat.name}</h3>
                                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{chat.lastMessageTime}</span>
                                </div>
                                <p className="text-xs text-white/50 truncate mt-1.5 font-medium leading-relaxed">{chat.lastMessage}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black text-white/30 uppercase tracking-widest">{chat.role}</span>
                                </div>
                            </div>
                            {chat.unread > 0 && (
                                <div className="flex items-center justify-center self-center min-w-[20px] h-[20px] bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20">
                                    {chat.unread}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div
                className={cn(
                    "flex-1 flex flex-col min-w-0 transition-all duration-300",
                    !selectedChatId ? "hidden md:flex" : "flex"
                )}
                style={{ backgroundColor: currentTheme }}
            >
                {!selectedChatId ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/20 gap-6 p-12 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/5 shadow-inner animate-pulse">
                            <MessageSquare className="w-10 h-10 opacity-30" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-white/40 tracking-tight">Select a Chat</h3>
                            <p className="text-sm font-medium italic">Communicate instantly with your team and visitors in real-time.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div
                            className="h-20 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-md"
                            style={{ backgroundColor: `${currentTheme}E6` }}
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedChatId(null)}
                                    className="md:hidden p-2 -ml-2 text-white/50 hover:text-white transition-all bg-white/5 rounded-xl"
                                >
                                    <ArrowLeft className={cn("w-5 h-5", isArabic && "rotate-180")} />
                                </button>
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg",
                                    selectedChat?.avatarBg || "premium-gradient"
                                )}>
                                    {selectedChat?.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-black text-sm text-white tracking-tight">{selectedChat?.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={cn("w-2 h-2 rounded-full", selectedChat?.online ? "bg-green-500 animate-pulse" : "bg-white/20")} />
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                                            {selectedChat?.online ? (isArabic ? 'متصل الآن' : 'Active Connection') : (isArabic ? 'غير متصل' : 'Offline')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3">
                                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5 shadow-sm">
                                    <Phone className="w-4 h-4" />
                                </button>
                                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5 shadow-sm">
                                    <Video className="w-4 h-4" />
                                </button>
                                <div className="w-px h-6 bg-white/10 mx-1" />
                                <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5 shadow-sm">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
                            {selectedChat?.messages.map((msg, idx) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex flex-col max-w-[80%] group",
                                        msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    {!msg.isMe && (
                                        <div className="flex items-center gap-2 mb-2 ml-1">
                                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em]">
                                                {msg.sender}
                                            </span>
                                            <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-black text-primary uppercase tracking-widest">
                                                {msg.role}
                                            </span>
                                        </div>
                                    )}
                                    <div className={cn(
                                        "px-5 py-3.5 rounded-3xl text-sm font-medium leading-relaxed transition-all shadow-sm",
                                        msg.isMe
                                            ? "premium-gradient text-white rounded-tr-none shadow-primary/20"
                                            : "bg-white/5 text-white/90 rounded-tl-none border border-white/10"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[9px] text-white/30 font-bold">{msg.timestamp}</span>
                                        {msg.isMe && (
                                            msg.isRead ? <CheckCheck className="w-3 h-3 text-primary" /> : <CheckCheck className="w-3 h-3 text-white/20" />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div
                            className="p-6 border-t border-white/5 backdrop-blur-md"
                            style={{ backgroundColor: `${currentTheme}E6` }}
                        >
                            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-[2rem] border border-white/5 shadow-inner focus-within:border-primary/30 focus-within:bg-white/10 transition-all">
                                <div className="flex items-center">
                                    <button className="p-3 text-white/30 hover:text-primary transition-all hover:bg-white/5 rounded-full">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 text-white/30 hover:text-primary transition-all hover:bg-white/5 rounded-full hidden sm:flex">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={isArabic ? 'اكتب رسالتك الذكية...' : 'Type a divine message...'}
                                    className="flex-1 px-2 py-3 bg-transparent text-sm font-medium border-none focus:ring-0 outline-none text-white placeholder:text-white/20"
                                />
                                <div className="flex items-center pr-2 gap-2">
                                    <button className="p-3 text-white/30 hover:text-primary transition-all hover:bg-white/5 rounded-full hidden sm:flex">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleSendMessage}
                                        className="p-4 premium-gradient text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
