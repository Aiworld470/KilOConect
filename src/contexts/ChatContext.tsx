import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, User } from '../types';
import { mockMessages } from '../data/mockData';

interface ChatContextType {
  messages: Message[];
  activeChat: string | null;
  sendMessage: (bookingId: string, content: string, type?: 'text' | 'price_offer') => Promise<void>;
  setActiveChat: (bookingId: string | null) => void;
  getMessagesForBooking: (bookingId: string) => Message[];
  markAsRead: (messageId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const sendMessage = async (
    bookingId: string, 
    content: string, 
    type: 'text' | 'price_offer' = 'text'
  ): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      bookingId,
      senderId: 'current-user', // This would be the current user's ID
      sender: {} as User, // This would be populated with current user data
      content,
      type,
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const getMessagesForBooking = (bookingId: string): Message[] => {
    return messages.filter(message => message.bookingId === bookingId);
  };

  const markAsRead = async (messageId: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, readAt: new Date() }
          : message
      )
    );
  };

  const value = {
    messages,
    activeChat,
    sendMessage,
    setActiveChat,
    getMessagesForBooking,
    markAsRead,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};