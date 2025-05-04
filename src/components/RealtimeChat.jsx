import { useEffect, useState, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import supabase from '../supabase/supabase-client';

dayjs.extend(relativeTime);

export default function RealtimeChat({ game }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getMessages = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('messages')
            .select()
            .eq('game_id', game.id)
            .order('created_at', { ascending: true });

        if (!error) {
            setMessages(data || []);
            setTimeout(scrollToBottom, 100);
        } else {
            console.error('Error fetching messages:', error);
        }
        setLoading(false);
    }, [game.id]);

    useEffect(() => {
        if (!game?.id) return;

        getMessages();

        const channel = supabase
            .channel(`realtime:messages`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `game_id=eq.${game.id}`
                },
                (payload) => {
                    console.log('New message realtime:', payload.new);
                    setMessages(prev => [...prev, payload.new]);
                    scrollToBottom();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [game.id, getMessages]);

    return (
        <div className="space-y-4 h-64 overflow-y-auto p-2">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner"></span>
                </div>
            ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-400">
                    No messages yet. Start the conversation!
                </div>
            ) : (
                messages.map((message) => (
                    <div key={message.id} className="chat chat-start">
                        <div className="chat-header">
                            {message.profile_username}
                            <time className="text-xs opacity-50 ml-2">
                                {dayjs(message.created_at).fromNow()}
                            </time>
                        </div>
                        <div className="chat-bubble bg-base-200">
                            {message.content}
                        </div>
                    </div>
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}
