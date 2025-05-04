import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import supabase from '../supabase/supabase-client';
import { FaUser } from 'react-icons/fa';

dayjs.extend(relativeTime);

export default function RealtimeChat({ game }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('game_id', game.id)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!game?.id) return;

        getMessages();

        const channel = supabase
            .channel(`messages:game_id=eq.${game.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                    filter: `game_id=eq.${game.id}`
                },
                () => getMessages()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [game.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="bg-base-100 rounded-lg p-4 h-96 overflow-y-auto">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                    No messages yet. Be the first to chat!
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className="chat" ref={messages.length - 1 === messages.indexOf(message) ? messagesEndRef : null}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                                    <FaUser />
                                </div>
                            </div>
                            <div className="chat-header">
                                {message.profile_username}
                                <time className="text-xs opacity-50 ml-2">
                                    {dayjs(message.created_at).fromNow()}
                                </time>
                            </div>
                            <div className="chat-bubble bg-base-300">
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}