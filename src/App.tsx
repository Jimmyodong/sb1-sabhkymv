import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { DatasetSelector } from './components/DatasetSelector';
import { Message } from './types';
import { useDatasets } from './hooks/useDatasets';
import { analyzeData, formatAnalysisResponse } from './utils/analysisUtils';

function App() {
  const { datasets, isLoading: datasetsLoading, error: datasetsError } = useDatasets();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your data analysis assistant. Please select a dataset to begin analysis.',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!selectedDataset) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Please select a dataset first to perform analysis.',
        role: 'assistant',
        timestamp: new Date()
      }]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsAnalyzing(true);

    try {
      const analysisResult = await analyzeData(content, selectedDataset);
      const response = formatAnalysisResponse(analysisResult);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error performing the analysis. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Data Analysis Assistant</h1>
        
        {datasetsError && (
          <div className="text-red-500 mb-4">
            {datasetsError}
          </div>
        )}
        
        <DatasetSelector
          datasets={datasets}
          selectedDataset={selectedDataset}
          onSelect={setSelectedDataset}
          isLoading={datasetsLoading}
        />
        
        <div className="space-y-4 mb-4 max-h-[600px] overflow-y-auto">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isAnalyzing && (
            <div className="text-center text-gray-500">
              Analyzing data...
            </div>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;