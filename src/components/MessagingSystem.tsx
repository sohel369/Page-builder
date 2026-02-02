import { useState } from 'react';
import { Search, Send, User, MoreVertical, CheckCheck, Clock, MessageSquare, Phone, Video, ArrowLeft } from 'lucide-react';
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
    time: string;
    unread: number;
    online: boolean;
    avatar?: string;
}

const chats: Chat[] = [
    { id: '1', name: 'Zaid Al-Harbi', lastMessage: 'The new landing page look...', time: '10:45 AM', unread: 2, online: true },
    { id: '2', name: 'Sarah Wilson', lastMessage: 'When will the bank integr...', time: '09:30 AM', unread: 0, online: false },
    { id: '3', name: 'John Doe (Visitor)', lastMessage: 'I have a question about th...', time: 'Yesterday', unread: 1, online: true },
];

const mockMessages: Message[] = [
    { id: '1', sender: 'Zaid Al-Harbi', role: 'moderator', content: 'The new landing page looks great, but we should refine the hero section effects.', timestamp: '10:45 AM', isRead: true, isMe: false },
    { id: '2', sender: 'Me', role: 'admin', content: 'I agree. I will add some glassmorphism effects to the hero block.', timestamp: '10:47 AM', isRead: true, isMe: true },
    { id: '3', sender: 'Zaid Al-Harbi', role: 'moderator', content: 'Perfect. Let me know when it\'s ready for approval.', timestamp: '10:48 AM', isRead: false, isMe: false },
];

interface MessagingSystemProps {
    isArabic?: boolean;
}

export function MessagingSystem({ isArabic = false }: MessagingSystemProps) {
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');

    return (
        <div className="flex h-full bg-background overflow-hidden animate-fade-in relative">
            {/* Sidebar - Chat List */}
            <div className={cn(
                "w-full md:w-80 flex flex-col border-border bg-card transition-all duration-300",
                isArabic ? "border-l" : "border-r",
                selectedChat ? "hidden md:flex" : "flex"
            )}>
                <div className="p-4 border-b border-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder={isArabic ? 'البحث عن المحادثات...' : 'Search messages...'}
                            className="w-full pl-9 pr-4 py-2 bg-secondary/50 rounded-lg text-sm border-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={cn(
                                "w-full p-4 flex gap-3 transition-colors hover:bg-secondary/30",
                                selectedChat === chat.id && "bg-secondary/50"
                            )}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                                    {chat.name[0]}
                                </div>
                                {chat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                                )}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{chat.time}</span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="flex items-center justify-center min-w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                                    {chat.unread}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={cn(
                "flex-1 flex flex-col min-w-0 bg-secondary/5 shadow-inner transition-all duration-300",
                !selectedChat ? "hidden md:flex" : "flex"
            )}>
                {!selectedChat ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                            <MessageSquare className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-sm">Select a conversation to start messaging</p>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSelectedChat(null)}
                                    className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <ArrowLeft className={cn("w-5 h-5", isArabic && "rotate-180")} />
                                </button>
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs md:text-sm">
                                    {chats.find(c => c.id === selectedChat)?.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xs md:text-sm">{chats.find(c => c.id === selectedChat)?.name}</h3>
                                    <p className="text-[10px] text-green-500 font-medium">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 text-muted-foreground">
                                <button className="p-2 hover:text-primary transition-colors"><Phone className="w-4 h-4 md:w-5 md:h-5" /></button>
                                <button className="p-2 hover:text-primary transition-colors"><Video className="w-4 h-4 md:w-5 md:h-5" /></button>
                                <button className="p-2 hover:text-primary transition-colors"><MoreVertical className="w-4 h-4 md:w-5 md:h-5" /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-secondary/10">
                            {mockMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex flex-col max-w-[70%]",
                                        msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    {!msg.isMe && (
                                        <span className="text-[10px] font-medium text-muted-foreground mb-1 ml-1 px-1">
                                            {msg.sender} • {msg.role}
                                        </span>
                                    )}
                                    <div className={cn(
                                        "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                                        msg.isMe
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-card text-foreground rounded-tl-none border border-border"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 px-1">
                                        <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                                        {msg.isMe && (
                                            msg.isRead ? <CheckCheck className="w-3 h-3 text-primary" /> : <CheckCheck className="w-3 h-3 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-card border-t border-border">
                            <div className="flex items-center gap-3">
                                <button className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-all">
                                    <MessageSquare className="w-5 h-5" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                                        className="w-full px-4 py-2.5 bg-secondary/50 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <button className="p-2.5 gradient-primary text-primary-foreground rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition-all">
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
