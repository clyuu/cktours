import React from 'react';

export interface Destination {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface Experience {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export enum ChatSender {
  USER = 'user',
  AI = 'ai'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: number;
}