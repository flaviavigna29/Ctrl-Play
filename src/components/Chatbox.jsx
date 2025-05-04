import { useContext, useRef } from 'react';
import { Link } from "react-router";import supabase from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext';
import RealtimeChat from './RealtimeChat';

export default function Chatbox({ game }) {
  const { session } = useContext(SessionContext);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get('message');

    if (!message?.trim() || !session) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        profile_id: session.user.id,
        profile_username: session.user.user_metadata.username || session.user.email.split('@')[0],
        game_id: game.id,
        content: message
      });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      formRef.current?.reset();
    }
  };

  return (
    <div className="card bg-base-200 mt-8">
      <div className="card-body p-4">
        <h3 className="card-title">Gamers Chat</h3>
        <RealtimeChat game={game} />

        {session ? (
          <form onSubmit={handleSubmit} ref={formRef} className="mt-4">
            <div className="join w-full">
              <input
                name="message"
                type="text"
                placeholder="Type your message..."
                className="input input-bordered join-item w-full"
                required
              />
              <button type="submit" className="btn btn-primary join-item">
                Send
              </button>
            </div>
          </form>
        ) : (

          <Link to="/register" className="btn btn-primary px-2">Please login to participate in the chat</Link>
        )}
      </div>
    </div>
  );
}