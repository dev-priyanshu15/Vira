
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, BarChart3, BookOpen, Shield, Heart, ArrowRight, CheckCircle, Key, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatInterface from "@/components/ChatInterface";
import MoodTracker from "@/components/MoodTracker";
import MentalHealthScreening from "@/components/MentalHealthScreening";
import ResourceHub from "@/components/ResourceHub";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  const features = [
    {
      icon: Brain,
      title: "Mental Health Screening",
      description: "Take scientifically-backed questionnaires to understand your mental well-being",
      color: "text-blue-400"
    },
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "Chat with VIRA, your empathetic AI companion available 24/7",
      color: "text-green-400"
    },
    {
      icon: BarChart3,
      title: "Mood Analytics",
      description: "Track your emotions and discover patterns with beautiful insights",
      color: "text-purple-400"
    },
    {
      icon: BookOpen,
      title: "Resource Hub",
      description: "Access curated articles, videos, and professional support",
      color: "text-orange-400"
    }
  ];

  const benefits = [
    "Private and anonymous support",
    "24/7 availability",
    "Evidence-based assessments",
    "Personalized coping strategies",
    "Professional resource connections"
  ];

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem('openrouter_api_key', apiKey);
    setIsApiKeySet(true);
    toast({
      title: "API Key Set Successfully",
      description: "You can now use all VIRA features!"
    });
  };

  const checkApiKey = () => {
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsApiKeySet(true);
      return true;
    }
    return false;
  };

  // Check for saved API key on component mount
  useState(() => {
    checkApiKey();
  });

  if (activeSection === "chat") {
    return <ChatInterface onBack={() => setActiveSection("home")} apiKey={apiKey} />;
  }

  if (activeSection === "mood") {
    return <MoodTracker onBack={() => setActiveSection("home")} />;
  }

  if (activeSection === "screening") {
    return <MentalHealthScreening onBack={() => setActiveSection("home")} />;
  }

  if (activeSection === "resources") {
    return <ResourceHub onBack={() => setActiveSection("home")} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  VIRA
                </h1>
                <p className="text-xs text-gray-400">Mental Health Companion</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-700">
              <Shield className="h-3 w-3 mr-1" />
              Privacy Protected
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* API Key Setup */}
        {!isApiKeySet && (
          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Key className="h-6 w-6 text-blue-400" />
                <div>
                  <CardTitle className="text-white">Setup Required</CardTitle>
                  <CardDescription className="text-gray-400">
                    Enter your OpenRouter API key to unlock all VIRA features
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <Input
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button 
                  onClick={handleApiKeySubmit}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
              <a 
                href="https://openrouter.ai/keys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
              >
                Get an API key from OpenRouter →
              </a>
            </CardContent>
          </Card>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-6 shadow-2xl">
              <Brain className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Meet VIRA
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Your Mental Health Companion</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            An intelligent and empathetic companion designed to support your mental well-being journey with privacy, compassion, and 24/7 availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setActiveSection("chat")}
              disabled={!isApiKeySet}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chatting with VIRA
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection("screening")}
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-lg text-lg transition-all duration-300"
            >
              Take Mental Health Assessment
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-700 rounded-full p-3">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl mb-12">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12" />
            </div>
            <CardTitle className="text-3xl mb-4">Why Choose VIRA?</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Breaking the stigma around mental health with accessible, private support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            onClick={() => setActiveSection("chat")}
            disabled={!isApiKeySet}
            variant="outline"
            className="h-20 flex-col space-y-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white disabled:opacity-50"
          >
            <MessageCircle className="h-6 w-6 text-blue-400" />
            <span>Chat with VIRA</span>
          </Button>
          <Button 
            onClick={() => setActiveSection("mood")}
            variant="outline"
            className="h-20 flex-col space-y-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
          >
            <BarChart3 className="h-6 w-6 text-purple-400" />
            <span>Track Mood</span>
          </Button>
          <Button 
            onClick={() => setActiveSection("screening")}
            variant="outline"
            className="h-20 flex-col space-y-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
          >
            <Brain className="h-6 w-6 text-green-400" />
            <span>Health Screening</span>
          </Button>
          <Button 
            onClick={() => setActiveSection("resources")}
            variant="outline"
            className="h-20 flex-col space-y-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
          >
            <BookOpen className="h-6 w-6 text-orange-400" />
            <span>Resources</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
