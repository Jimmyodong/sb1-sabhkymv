import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-4 ${
        isAssistant ? 'bg-gray-100' : 'bg-blue-500 text-white'
      }`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs text-gray-500 mt-2 block">
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};