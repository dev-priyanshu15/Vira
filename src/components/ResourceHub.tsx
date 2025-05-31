
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Video, Headphones, Phone, Search, ExternalLink, Heart, Brain, Users } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "video" | "podcast" | "hotline" | "app";
  url: string;
  tags: string[];
}

interface ResourceHubProps {
  onBack: () => void;
}

const ResourceHub = ({ onBack }: ResourceHubProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resources: Resource[] = [
    // Crisis & Emergency Resources
    {
      id: "1",
      title: "National Suicide Prevention Lifeline",
      description: "24/7 crisis support for people experiencing suicidal thoughts",
      category: "crisis",
      type: "hotline",
      url: "tel:988",
      tags: ["suicide", "crisis", "24/7", "emergency"]
    },
    {
      id: "2",
      title: "Crisis Text Line",
      description: "Free, 24/7 text-based crisis support",
      category: "crisis",
      type: "hotline",
      url: "sms:741741",
      tags: ["crisis", "text", "24/7", "support"]
    },
    {
      id: "3",
      title: "NAMI Helpline",
      description: "National Alliance on Mental Illness support line",
      category: "crisis",
      type: "hotline",
      url: "tel:1-800-950-6264",
      tags: ["support", "information", "mental health"]
    },

    // Educational Articles
    {
      id: "4",
      title: "Understanding Depression: Signs, Symptoms, and Treatment",
      description: "Comprehensive guide to recognizing and treating depression",
      category: "education",
      type: "article",
      url: "https://www.nimh.nih.gov/health/topics/depression",
      tags: ["depression", "symptoms", "treatment", "mental health"]
    },
    {
      id: "5",
      title: "Anxiety Disorders: Types, Causes, and Treatment Options",
      description: "Learn about different anxiety disorders and available treatments",
      category: "education",
      type: "article",
      url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      tags: ["anxiety", "treatment", "disorders", "therapy"]
    },
    {
      id: "6",
      title: "The Science of Stress: Understanding Your Body's Response",
      description: "How stress affects your body and mind, and ways to manage it",
      category: "education",
      type: "article",
      url: "https://www.apa.org/science/about/psa/2007/10/stress-tips",
      tags: ["stress", "science", "management", "health"]
    },

    // Self-Help & Coping
    {
      id: "7",
      title: "Mindfulness-Based Stress Reduction Techniques",
      description: "Evidence-based mindfulness practices for stress reduction",
      category: "self-help",
      type: "article",
      url: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      tags: ["mindfulness", "meditation", "stress", "techniques"]
    },
    {
      id: "8",
      title: "Cognitive Behavioral Therapy Self-Help Resources",
      description: "CBT techniques you can practice on your own",
      category: "self-help",
      type: "article",
      url: "https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself",
      tags: ["CBT", "self-help", "therapy", "techniques"]
    },

    // Videos & Multimedia
    {
      id: "9",
      title: "TED Talk: The Power of Vulnerability",
      description: "Brené Brown discusses the importance of vulnerability in mental health",
      category: "education",
      type: "video",
      url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
      tags: ["vulnerability", "TED", "mental health", "resilience"]
    },
    {
      id: "10",
      title: "Guided Meditation for Anxiety Relief",
      description: "10-minute guided meditation specifically for anxiety",
      category: "self-help",
      type: "video",
      url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
      tags: ["meditation", "anxiety", "guided", "relaxation"]
    },

    // Podcasts
    {
      id: "11",
      title: "The Mental Illness Happy Hour",
      description: "Honest discussions about mental health with comedian Paul Gilmartin",
      category: "education",
      type: "podcast",
      url: "https://mentalpod.com/",
      tags: ["podcast", "mental health", "stories", "support"]
    },
    {
      id: "12",
      title: "Therapy for Black Girls Podcast",
      description: "Mental health discussions focused on Black women and girls",
      category: "education",
      type: "podcast",
      url: "https://therapyforblackgirls.com/podcast/",
      tags: ["podcast", "therapy", "mental health", "community"]
    },

    // Mobile Apps
    {
      id: "13",
      title: "Headspace",
      description: "Meditation and mindfulness app with guided sessions",
      category: "tools",
      type: "app",
      url: "https://www.headspace.com/",
      tags: ["app", "meditation", "mindfulness", "guided"]
    },
    {
      id: "14",
      title: "Calm",
      description: "Sleep stories, meditation, and relaxation app",
      category: "tools",
      type: "app",
      url: "https://www.calm.com/",
      tags: ["app", "sleep", "meditation", "relaxation"]
    },
    {
      id: "15",
      title: "Sanvello",
      description: "Anxiety and mood tracking with coping tools",
      category: "tools",
      type: "app",
      url: "https://www.sanvello.com/",
      tags: ["app", "anxiety", "mood tracking", "coping"]
    }
  ];

  const categories = [
    { id: "all", label: "All Resources", icon: BookOpen },
    { id: "crisis", label: "Crisis Support", icon: Phone },
    { id: "education", label: "Education", icon: Brain },
    { id: "self-help", label: "Self-Help", icon: Heart },
    { id: "tools", label: "Tools & Apps", icon: Users }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return <BookOpen className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "podcast": return <Headphones className="h-4 w-4" />;
      case "hotline": return <Phone className="h-4 w-4" />;
      case "app": return <ExternalLink className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article": return "bg-blue-100 text-blue-700";
      case "video": return "bg-red-100 text-red-700";
      case "podcast": return "bg-purple-100 text-purple-700";
      case "hotline": return "bg-green-100 text-green-700";
      case "app": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const crisisResources = resources.filter(r => r.category === "crisis");
  const educationalResources = resources.filter(r => r.category === "education");
  const selfHelpResources = resources.filter(r => r.category === "self-help");
  const toolsResources = resources.filter(r => r.category === "tools");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-orange-500" />
                <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Resource Hub
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Search */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search resources, articles, tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge className={`${getTypeColor(resource.type)} mb-2`}>
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </div>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Access Resource
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crisis" className="mt-6">
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Resources</h3>
              <p className="text-red-700 text-sm">
                If you're in immediate danger or having thoughts of self-harm, please contact emergency services (911) or use one of these crisis resources immediately.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {crisisResources.map((resource) => (
                <Card key={resource.id} className="border-red-200 shadow-md">
                  <CardHeader>
                    <Badge className="bg-red-100 text-red-700 mb-2 w-fit">
                      <Phone className="h-3 w-3 mr-1" />
                      Crisis Support
                    </Badge>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button asChild className="w-full bg-red-500 hover:bg-red-600">
                      <a href={resource.url}>
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Now
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {educationalResources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-md">
                  <CardHeader>
                    <Badge className={`${getTypeColor(resource.type)} mb-2 w-fit`}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1 capitalize">{resource.type}</span>
                    </Badge>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <Button asChild className="w-full" variant="outline">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="self-help" className="mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {selfHelpResources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-md">
                  <CardHeader>
                    <Badge className={`${getTypeColor(resource.type)} mb-2 w-fit`}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1 capitalize">{resource.type}</span>
                    </Badge>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Try This Resource
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolsResources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-md">
                  <CardHeader>
                    <Badge className="bg-orange-100 text-orange-700 mb-2 w-fit">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      App
                    </Badge>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Get App
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourceHub;
