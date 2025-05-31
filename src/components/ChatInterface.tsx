
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "vira";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
  apiKey: string;
}

const ChatInterface = ({ onBack, apiKey }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm VIRA, your mental health companion. I'm here to listen, support, and help you navigate your feelings. How are you doing today?",
      sender: "vira",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'VIRA Mental Health Companion'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are VIRA, a compassionate and empathetic mental health companion AI. Your role is to:
              - Provide emotional support and active listening
              - Offer evidence-based coping strategies and mindfulness techniques
              - Help users identify patterns in their thoughts and feelings
              - Suggest breathing exercises, journaling prompts, or relaxation techniques
              - Encourage professional help when appropriate
              - Always be non-judgmental, supportive, and understanding
              - Never provide medical diagnosis or replace professional therapy
              - Focus on empowerment and self-care strategies
              - Be warm, caring, and genuinely interested in the user's wellbeing
              
              Keep responses concise but meaningful, typically 2-3 sentences unless more detail is specifically needed.`
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            {
              role: 'user',
              content: inputValue
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenRouter');
      }

      const data = await response.json();
      const viraResponse = data.choices[0].message.content;

      const viraMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: viraResponse,
        sender: "vira",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, viraMessage]);
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      toast({
        title: "Connection Error",
        description: "I'm having trouble connecting right now. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-green-400 rounded-full w-3 h-3 border-2 border-gray-900"></div>
              </div>
              <div>
                <h1 className="font-semibold text-white">VIRA</h1>
                <p className="text-xs text-gray-400">Your AI Mental Health Companion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow flex flex-col max-w-4xl mx-auto px-4 py-4 w-full">
        <Card className="flex-grow bg-gray-800 border-gray-700 mb-4 shadow-lg">
          <ScrollArea className="h-[calc(100vh-230px)]" ref={scrollAreaRef}>
            <div className="p-4 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse items-end' : 'items-start'}`}>
                    <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                      <div className={`rounded-full p-2 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-700 text-gray-100 rounded-bl-none'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        <span className="text-sm text-gray-400">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Message Input */}
        <div className="sticky bottom-0 bg-gray-900">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-3">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message VIRA..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                VIRA is an AI assistant and not a replacement for professional mental health care.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
