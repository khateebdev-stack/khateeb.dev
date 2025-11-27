"use client"

import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Phone, User, Bot, Mic } from "lucide-react"
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
    const [isDragging, setIsDragging] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    const socketRef = useRef(null)
    const messagesEndRef = useRef(null)
    const typingTimeoutRef = useRef(null)
    const fileInputRef = useRef(null)
    const mediaRecorderRef = useRef(null)

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
            text: URL.createObjectURL(file), // Create Blob URL for all files (images & docs)
            name: file.name,
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
            // Convert to ArrayBuffer to ensure binary data is sent correctly
            const reader = new FileReader();
            reader.onload = (evt) => {
                const arrayBuffer = evt.target.result;
                console.log(`[Client] Sending file: ${file.name}, Size: ${arrayBuffer.byteLength} bytes`);
                socketRef.current.emit("file_upload", { name: file.name, buffer: arrayBuffer });
            };
            reader.readAsArrayBuffer(file);

            setTimeout(() => {
                setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m))
            }, 500)
        }
    }

    // Voice Recording Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Check supported MIME types for mobile compatibility
            // User requested OGG. We prioritize OGG, then WebM (often OGG container), then MP4 (iOS fallback).
            let mimeType = 'audio/webm';
            let extension = 'ogg'; // Default to .ogg as requested

            if (MediaRecorder.isTypeSupported('audio/ogg; codecs=opus')) {
                mimeType = 'audio/ogg; codecs=opus';
                extension = 'ogg';
            } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
                mimeType = 'audio/ogg';
                extension = 'ogg';
            } else if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
                mimeType = 'audio/webm; codecs=opus';
                extension = 'ogg'; // Force .ogg extension for WebM/Opus (Discord plays this better)
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                mimeType = 'audio/mp4';
                extension = 'm4a'; // iOS requires .m4a or .mp4
            }

            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = mediaRecorder;
            const chunks = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: mimeType });
                const file = new File([blob], `voice_note.${extension}`, { type: mimeType });

                // Manually trigger upload since we're creating the file programmatically
                handleFileUpload({ target: { files: [file] } });

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please allow permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

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
                            <div
                                className="h-[350px] overflow-y-auto p-4 space-y-4 bg-muted/30 flex flex-col relative"
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    const file = e.dataTransfer.files[0];
                                    if (file) handleFileUpload({ target: { files: [file] } });
                                }}
                            >
                                {isDragging && (
                                    <div className="absolute inset-0 bg-primary/80 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm">
                                        <div className="text-white font-bold text-lg flex flex-col items-center animate-bounce">
                                            <Send className="h-10 w-10 mb-2" />
                                            Drop file to send
                                        </div>
                                    </div>
                                )}
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
                                            ) : msg.type === 'audio' ? (
                                                <audio controls src={msg.text} className="max-w-full" />
                                            ) : msg.type === 'video' ? (
                                                <video controls src={msg.text} className="rounded-lg max-w-full" />
                                            ) : msg.type === 'file' ? (
                                                <a href={msg.text} target="_blank" rel="noopener noreferrer" title={msg.name} className="flex items-center gap-3 p-3 bg-background/10 rounded-xl hover:bg-background/20 transition-all border border-white/10 group">
                                                    <div className="bg-background/20 p-2.5 rounded-lg group-hover:bg-background/30 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                                    </div>
                                                    <div className="flex flex-col overflow-hidden min-w-[120px]">
                                                        <span className="font-medium text-sm truncate w-full">{msg.name || 'Attachment'}</span>
                                                        <span className="text-[10px] opacity-70 flex items-center gap-1">
                                                            Download <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                                        </span>
                                                    </div>
                                                </a>
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

                                {/* Voice Recorder Button */}
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className={`${isRecording ? 'text-red-500 animate-pulse' : 'text-muted-foreground hover:text-foreground'}`}
                                    onMouseDown={startRecording}
                                    onMouseUp={stopRecording}
                                    onTouchStart={startRecording}
                                    onTouchEnd={stopRecording}
                                    title="Hold to Record"
                                >
                                    <Mic className="h-5 w-5" />
                                </Button>

                                <Input
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder={isRecording ? "Recording..." : "Type a message..."}
                                    className="flex-1"
                                    disabled={isRecording}
                                />
                                <Button type="submit" size="icon" disabled={!inputText.trim() && !isRecording}>
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
