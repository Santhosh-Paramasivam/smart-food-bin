import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const channel = supabase
            .channel('food-bin-watch')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'FoodBinReadings' },
                (payload) => {
                    console.log(payload);
                    setMessages((prev) => { return payload['new'] });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <ul>
            {Object.entries(messages).map(([key, value]) => (
                <li key={key}>
                    <strong>{key}:</strong> {String(value)}
                </li>
            ))}
        </ul>
    );
};

export default Messages;

