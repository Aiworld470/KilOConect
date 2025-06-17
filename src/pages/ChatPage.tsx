import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { Message, User } from '../types';
import { users, mockMessages } from '../data/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAIBypassDetection } from '../hooks/useAI';
import { AISecurityAlert } from '../components/ai/AISecurityAlert';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { messages, sendMessage, getMessagesForBooking } = useChat();
  const [selectedChat, setSelectedChat] = useState<string | null>('booking-1');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { detection, analyzeMessage } = useAIBypassDetection();
  const [securityAlert, setSecurityAlert] = useState<any>(null);

  // Mock conversations list
  const conversations = [
    {
      id: 'booking-1',
      participant: users[1],
      lastMessage: 'Parfait ! Je confirme le transport pour 75€',
      lastMessageTime: new Date('2024-01-12T11:00:00'),
      unreadCount: 2,
      tripRoute: 'Paris → Dakar',
    },
    {
      id: 'booking-2',
      participant: users[2],
      lastMessage: 'Merci pour la confirmation !',
      lastMessageTime: new Date('2024-01-11T15:30:00'),
      unreadCount: 0,
      tripRoute: 'Dakar → Abidjan',
    },
    {
      id: 'booking-3',
      participant: users[3],
      lastMessage: 'Quand pouvez-vous récupérer le colis ?',
      lastMessageTime: new Date('2024-01-10T09:15:00'),
      unreadCount: 1,
      tripRoute: 'Bruxelles → Accra',
    },
  ];

  const currentConversation = conversations.find(c => c.id === selectedChat);
  const conversationMessages = selectedChat ? getMessagesForBooking(selectedChat) : [];

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedChat) return;

    // Analyse IA pour détecter les tentatives de contournement
    const context = {
      conversationHistory: conversationMessages,
      user: user,
      selectedChat
    };
    
    const securityCheck = analyzeMessage(newMessage, context);
    
    if (securityCheck.riskScore > 0.5) {
      // Message suspect - afficher alerte
      setSecurityAlert(securityCheck);
      return;
    }

    try {
      await sendMessage(selectedChat, newMessage.trim());
      setNewMessage('');
      setSecurityAlert(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSecurityAction = (action: string) => {
    console.log('Security action:', action);
    
    if (action.includes('Bloquer')) {
      // Bloquer le message
      setNewMessage('');
      setSecurityAlert(null);
    } else if (action.includes('Avertir')) {
      // Avertir l'utilisateur mais permettre l'envoi
      if (window.confirm('Ce message pourrait contenir des informations de contact personnelles. L\'échange d\'informations de contact en dehors de la plateforme est interdit et peut entraîner la suspension de votre compte. Souhaitez-vous modifier votre message ?')) {
        return;
      } else {
        sendMessage(selectedChat!, newMessage.trim());
        setNewMessage('');
        setSecurityAlert(null);
      }
    } else {
      // Action par défaut
      setSecurityAlert(null);
    }
  };

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return format(date, 'HH:mm');
    } else if (diffInHours < 48) {
      return 'Hier ' + format(date, 'HH:mm');
    } else {
      return format(date, 'dd/MM HH:mm');
    }
  };

  const MessageBubble: React.FC<{ message: Message; isOwn: boolean }> = ({ message, isOwn }) => (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isOwn && (
          <img
            src={message.sender.avatar}
            alt={message.sender.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        
        <div className={`
          px-4 py-2 rounded-lg
          ${isOwn 
            ? 'bg-primary-600 text-white' 
            : 'bg-white border border-gray-200 text-gray-900'
          }
          ${message.type === 'price_offer' ? 'border-2 border-green-300 bg-green-50' : ''}
        `}>
          {message.type === 'price_offer' && (
            <div className="text-xs font-medium text-green-700 mb-1">
              💰 Offre de prix
            </div>
          )}
          
          <p className="text-sm">{message.content}</p>
          
          <div className={`text-xs mt-1 ${isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
            {formatMessageTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`
                p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                ${selectedChat === conversation.id ? 'bg-primary-50 border-primary-200' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participant.avatar}
                    alt={conversation.participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatMessageTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                  
                  <p className="text-xs text-primary-600 mt-1">
                    {conversation.tripRoute}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedChat && currentConversation ? (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={currentConversation.participant.avatar}
                    alt={currentConversation.participant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-medium text-gray-900">
                      {currentConversation.participant.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {currentConversation.tripRoute}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Info className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.length > 0 ? (
                conversationMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.senderId === user?.id}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun message pour le moment</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Commencez la conversation !
                  </p>
                </div>
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Security Alert */}
            {securityAlert && (
              <div className="px-4 mb-4">
                <AISecurityAlert 
                  detection={securityAlert} 
                  onAction={handleSecurityAction} 
                />
              </div>
            )}

            {/* Message input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Paperclip className="h-5 w-5" />
                </button>

                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim() || !!securityAlert}
                  className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-2 text-xs text-gray-500 text-center">
                💡 Négociez directement avec le transporteur pour le meilleur prix
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sélectionnez une conversation
              </h3>
              <p className="text-gray-600">
                Choisissez une conversation pour commencer à discuter
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;