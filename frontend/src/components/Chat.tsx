import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/?token=${token}`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, { text: data.message, sender: 'ai' }]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      const messageData = {
        message: input,
        session_id: 'some-session-id', // Replace with actual session ID
        psychologist_type: 'general', // Replace with actual psychologist type
      };

      try {
        const response = await fetch('http://localhost:8000/api/chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages((prev) => [
            ...prev,
            { text: input, sender: 'user' },
            { text: data.response, sender: 'ai' },
          ]);
          setInput('');
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-effect p-6 rounded-lg h-full flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-4">Chat with AI Psychologist</h2>
      <ScrollArea className="flex-grow p-4 rounded-lg bg-accent/10 mb-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {msg.sender === 'ai' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.fullName?.[0]}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button onClick={sendMessage} className="gradient-primary">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default Chat;
