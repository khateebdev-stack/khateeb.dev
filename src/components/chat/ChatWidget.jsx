"use client"

import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Phone, User, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { content } from "@/lib/content"

// Connect to backend (default to localhost in dev, env var in prod)
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [adminStatus, setAdminStatus] = useState("offline")
    const socketRef = useRef(null)
    const messagesEndRef = useRef(null)
    const typingTimeoutRef = useRef(null)
    const fileInputRef = useRef(null)

    const { direct_contact } = content.contact
    const suggestedMessages = ["Hi! I need a website.", "What are your rates?", "Can we schedule a call?", "Do you do SEO?"]

    useEffect(() => {
        // Load messages from localStorage
        const savedMessages = localStorage.getItem("chat_history")
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages))
        } else {
            // No initial message, let Suggested Messages show
            setMessages([])
        }

        // Get or Create Session ID
        let sessionId = localStorage.getItem("chat_session_id")
        if (!sessionId) {
            sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem("chat_session_id", sessionId)
        }

        // Initialize Socket with Session ID
        socketRef.current = io(SOCKET_URL, {
            auth: { sessionId }
        })

        socketRef.current.on("connect", () => {
            setIsConnected(true)
            console.log("Connected to Chat Server with Session:", sessionId)
        })

        socketRef.current.on("disconnect", () => {
            setIsConnected(false)
            setAdminStatus("offline")
        })

        socketRef.current.on("admin_message", (msg) => {
            const newMsg = { id: Date.now(), text: msg.text, type: msg.type || 'text', sender: "agent", status: 'read' }
            setMessages(prev => {
                const updated = [...prev, newMsg]
                localStorage.setItem("chat_history", JSON.stringify(updated))
                return updated
            })
            setIsTyping(false)
        })

        socketRef.current.on("history_sync", (history) => {
            console.log("Received history sync:", history.length, "messages");
            setMessages(history); // Replace local state with server truth
            localStorage.setItem("chat_history", JSON.stringify(history));
        })

        socketRef.current.on("message_sent", () => {
            setMessages(prev => {
                // Mark the last 'sent' message as 'delivered'
                // In a real app, we'd match by ID. For now, we assume order is preserved.
                const updated = [...prev];
                for (let i = updated.length - 1; i >= 0; i--) {
                    if (updated[i].sender === 'user' && updated[i].status === 'sent') {
                        updated[i] = { ...updated[i], status: 'delivered' };
                        break; // Only mark the latest one
                    }
                }
                localStorage.setItem("chat_history", JSON.stringify(updated));
                return updated;
            })
        })

        socketRef.current.on("admin_reaction", (data) => {
            // Add reaction to the last message from the agent (or user, depending on context)
            // For now, we'll just attach it to the very last message in the chat
            setMessages(prev => {
                if (prev.length === 0) return prev;
                const lastMsgIndex = prev.length - 1;
                const updated = [...prev];
                updated[lastMsgIndex] = {
                    ...updated[lastMsgIndex],
                    reaction: data.emoji
                };
                localStorage.setItem("chat_history", JSON.stringify(updated));
                return updated;
            })
        })

        socketRef.current.on("admin_typing", () => {
            setIsTyping(true)
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
            typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000)
        })

        socketRef.current.on("admin_status", (status) => {
            setAdminStatus(status)
        })

        return () => {
            socketRef.current.disconnect()
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    const sendMessage = (text = inputText) => {
        if (!text.trim()) return

        const newMsg = { id: Date.now(), text: text, sender: "user", status: 'sent' }
        setMessages(prev => {
            const updated = [...prev, newMsg]
            localStorage.setItem("chat_history", JSON.stringify(updated))
            return updated
        })

        if (socketRef.current) {
            socketRef.current.emit("chat_message", text)
            // Status will be updated to 'delivered' when server acknowledges via 'message_sent' event
        }

        setInputText("")
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const isImage = file.type.startsWith('image/')
        const newMsg = {
            id: Date.now(),
            text: isImage ? URL.createObjectURL(file) : `📄 Sent file: ${file.name}`,
            sender: "user",
            type: isImage ? "image" : "file",
            status: 'sent'
        }

        setMessages(prev => {
            const updated = [...prev, newMsg]
            localStorage.setItem("chat_history", JSON.stringify(updated))
            return updated
        })

        if (socketRef.current) {
            socketRef.current.emit("file_upload", { name: file.name, buffer: file })
            setTimeout(() => {
                setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m))
            }, 500)
        }
    }

    const openWhatsApp = () => {
        window.open(`https://wa.me/${direct_contact.whatsapp.replace(/\D/g, '')}`, '_blank')
    }

    const getStatusColor = () => {
        if (!isConnected) return 'bg-red-500'
        switch (adminStatus) {
            case 'online': return 'bg-green-500'
            case 'idle': return 'bg-yellow-500'
            case 'dnd': return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-[350px] sm:w-[380px] shadow-2xl"
                    >
                        <Card className="overflow-hidden border-2 border-primary/20">
                            {/* Header */}
                            <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-background/20 flex items-center justify-center">
                                            {/* <Bot className="h-6 w-6" />
                                             */}
                                                <img src="/logo.png" alt="Khateeb.dev Logo" className="h-8 w-auto dark:invert" />
                    
                                        </div>
                                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor()}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Khateeb AI</h3>
                                        <p className="text-xs opacity-90 capitalize">{!isConnected ? 'Reconnecting...' : adminStatus}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-green-500 hover:bg-green-600 text-white border-none h-8 px-3 gap-2"
                                        onClick={openWhatsApp}
                                        title="Switch to WhatsApp"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                        <span className="text-xs font-bold">WhatsApp</span>
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/20 text-white" onClick={() => setIsOpen(false)}>
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-muted/30 flex flex-col">
                                {messages.length === 0 && (
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-70">
                                        <Bot className="h-12 w-12 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Ask me anything!</p>
                                        <div className="flex flex-wrap justify-center gap-2 px-4">
                                            {suggestedMessages.map((msg, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => sendMessage(msg)}
                                                    className="text-xs bg-background border px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                                                >
                                                    {msg}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-card border shadow-sm rounded-bl-none"
                                                }`}
                                        >
                                            {msg.type === 'image' ? (
                                                <img src={msg.text} alt="Attachment" className="rounded-lg max-w-full" />
                                            ) : (
                                                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                                            )}
                                        </div>
                                        {msg.sender === "user" && (
                                            <span className="text-[10px] text-muted-foreground mr-1 mt-1">
                                                {msg.status === 'sent' ? '✓' : '✓✓'}
                                            </span>
                                        )}
                                        {msg.reaction && (
                                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm border text-xs">
                                                {msg.reaction}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-card border shadow-sm rounded-2xl rounded-bl-none px-4 py-2">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-3 bg-background border-t flex gap-2 items-center">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                // accept="image/*" // Removed to allow all files
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                </Button>
                                <Input
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1"
                                />
                                <Button type="submit" size="icon" disabled={!inputText.trim()}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.button>
        </div>
    )
}
