import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, AlertTriangle, CheckCircle, Info, TrendingUp, Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

interface Assessment {
  name: string;
  description: string;
  questions: Question[];
  interpretation: (score: number) => {
    level: "low" | "mild" | "moderate" | "severe";
    message: string;
    recommendations: string[];
    insights: string[];
  };
}

interface MentalHealthScreeningProps {
  onBack: () => void;
}

const MentalHealthScreening = ({ onBack }: MentalHealthScreeningProps) => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [results, setResults] = useState<any>(null);

  const assessments: { [key: string]: Assessment } = {
    phq9: {
      name: "PHQ-9 Depression Screening",
      description: "A 9-question tool to screen for depression symptoms over the past 2 weeks.",
      questions: [
        {
          id: "phq1",
          text: "Little interest or pleasure in doing things",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq2", 
          text: "Feeling down, depressed, or hopeless",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq3",
          text: "Trouble falling or staying asleep, or sleeping too much",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq4",
          text: "Feeling tired or having little energy",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq5",
          text: "Poor appetite or overeating",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq6",
          text: "Feeling bad about yourself or that you are a failure",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq7",
          text: "Trouble concentrating on things",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq8",
          text: "Moving or speaking slowly, or being fidgety",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "phq9",
          text: "Thoughts that you would be better off dead",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        }
      ],
      interpretation: (score: number) => {
        if (score <= 4) {
          return {
            level: "low",
            message: "Minimal depression symptoms detected.",
            recommendations: [
              "Continue with healthy lifestyle habits",
              "Practice regular self-care",
              "Stay connected with supportive relationships",
              "Maintain regular exercise and sleep schedules"
            ],
            insights: [
              "Your responses suggest you're managing well",
              "Keep up your current positive habits",
              "Consider preventive mental health practices"
            ]
          };
        } else if (score <= 9) {
          return {
            level: "mild",
            message: "Mild depression symptoms detected.",
            recommendations: [
              "Consider speaking with a counselor or therapist",
              "Engage in regular physical activity",
              "Practice mindfulness and relaxation techniques",
              "Maintain a regular sleep schedule",
              "Connect with friends and family regularly"
            ],
            insights: [
              "Early intervention can be very effective",
              "Your symptoms are manageable with the right support",
              "Many people experience similar challenges"
            ]
          };
        } else if (score <= 14) {
          return {
            level: "moderate",
            message: "Moderate depression symptoms detected.",
            recommendations: [
              "Strongly consider professional counseling or therapy",
              "Speak with your healthcare provider",
              "Build a strong support network",
              "Consider lifestyle changes that support mental health",
              "Monitor your symptoms closely"
            ],
            insights: [
              "Professional support can make a significant difference",
              "Your symptoms are affecting daily functioning",
              "Treatment options are available and effective"
            ]
          };
        } else {
          return {
            level: "severe",
            message: "Severe depression symptoms detected.",
            recommendations: [
              "Seek immediate professional help",
              "Contact your healthcare provider or mental health professional",
              "Consider calling a mental health crisis line if needed",
              "Don't hesitate to reach out to trusted friends or family",
              "Consider intensive treatment options"
            ],
            insights: [
              "Immediate professional intervention is recommended",
              "You don't have to face this alone",
              "Effective treatments are available"
            ]
          };
        }
      }
    },
    gad7: {
      name: "GAD-7 Anxiety Screening",
      description: "A 7-question tool to screen for anxiety symptoms over the past 2 weeks.",
      questions: [
        {
          id: "gad1",
          text: "Feeling nervous, anxious, or on edge",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "gad2",
          text: "Not being able to stop or control worrying",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "gad3",
          text: "Worrying too much about different things",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "gad4",
          text: "Trouble relaxing",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "gad5",
          text: "Being so restless that it's hard to sit still",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "gad6",
          text: "Becoming easily annoyed or irritable",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        },
        {
          id: "gad7",
          text: "Feeling afraid as if something awful might happen",
          options: [
            { value: 0, label: "Not at all" },
            { value: 1, label: "Several days" },
            { value: 2, label: "More than half the days" },
            { value: 3, label: "Nearly every day" }
          ]
        }
      ],
      interpretation: (score: number) => {
        if (score <= 4) {
          return {
            level: "low",
            message: "Minimal anxiety symptoms detected.",
            recommendations: [
              "Continue stress management practices",
              "Maintain healthy lifestyle habits",
              "Practice relaxation techniques when needed",
              "Keep up regular exercise routines"
            ],
            insights: [
              "Your anxiety levels appear to be well-managed",
              "Preventive strategies are working well",
              "Continue your current approach"
            ]
          };
        } else if (score <= 9) {
          return {
            level: "mild",
            message: "Mild anxiety symptoms detected.",
            recommendations: [
              "Practice regular stress reduction techniques",
              "Consider mindfulness or meditation",
              "Limit caffeine and alcohol",
              "Ensure adequate sleep and exercise",
              "Learn breathing exercises"
            ],
            insights: [
              "Early management can prevent escalation",
              "Stress reduction techniques can be very helpful",
              "Your symptoms are very treatable"
            ]
          };
        } else if (score <= 14) {
          return {
            level: "moderate",
            message: "Moderate anxiety symptoms detected.",
            recommendations: [
              "Consider professional counseling or therapy",
              "Speak with your healthcare provider",
              "Learn cognitive behavioral techniques",
              "Join a support group if available",
              "Practice regular relaxation techniques"
            ],
            insights: [
              "Professional guidance can provide effective strategies",
              "Cognitive techniques are particularly helpful for anxiety",
              "Many people benefit from therapy for anxiety"
            ]
          };
        } else {
          return {
            level: "severe",
            message: "Severe anxiety symptoms detected.",
            recommendations: [
              "Seek immediate professional help",
              "Contact your healthcare provider",
              "Consider medication evaluation if appropriate",
              "Practice crisis management techniques",
              "Build a strong support network"
            ],
            insights: [
              "Professional intervention is strongly recommended",
              "Anxiety at this level significantly impacts daily life",
              "Effective treatments are available"
            ]
          };
        }
      }
    }
  };

  const handleAssessmentSelect = (assessmentKey: string) => {
    setSelectedAssessment(assessmentKey);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (selectedAssessment && currentQuestion < assessments[selectedAssessment].questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    if (!selectedAssessment) return;
    
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const interpretation = assessments[selectedAssessment].interpretation(totalScore);
    
    setResults({
      score: totalScore,
      maxScore: assessments[selectedAssessment].questions.length * 3,
      ...interpretation
    });
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "low": return "text-green-400 bg-green-900/20 border-green-700";
      case "mild": return "text-yellow-400 bg-yellow-900/20 border-yellow-700";
      case "moderate": return "text-orange-400 bg-orange-900/20 border-orange-700";
      case "severe": return "text-red-400 bg-red-900/20 border-red-700";
      default: return "text-gray-400 bg-gray-900/20 border-gray-700";
    }
  };

  if (!selectedAssessment) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Card className="mb-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2 text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-purple-400" />
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Mental Health Screening
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Disclaimer */}
          <Alert className="mb-6 bg-blue-900/20 border-blue-700">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              <strong>Important:</strong> These assessments are for informational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider.
            </AlertDescription>
          </Alert>

          {/* Assessment Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(assessments).map(([key, assessment]) => (
              <Card key={key} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{assessment.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{assessment.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {assessment.questions.length} questions • 5-10 minutes
                  </p>
                  <Button 
                    onClick={() => handleAssessmentSelect(key)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={resetAssessment} className="flex items-center space-x-2 text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Assessments</span>
                </Button>
                <CardTitle className="text-white">Assessment Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Display */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {results.score}
                  </div>
                  <div className="text-lg text-gray-400">out of {results.maxScore}</div>
                </div>
                <p className="text-gray-400 mt-2">Total Score</p>
              </div>

              {/* Result Level */}
              <Card className={`border-2 ${getLevelColor(results.level)}`}>
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-2 text-white">{results.message}</h3>
                  <p className="text-gray-400">
                    Based on your responses to the {assessments[selectedAssessment].name}
                  </p>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    <span>Key Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.insights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Heart className="h-5 w-5 text-purple-400" />
                    <span>Personalized Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-200">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Crisis Resources */}
              {results.level === "severe" && (
                <Alert className="bg-red-900/20 border-red-700">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300">
                    <strong>Crisis Resources:</strong> If you're having thoughts of self-harm, please contact:
                    <br />• National Suicide Prevention Lifeline: 988
                    <br />• Crisis Text Line: Text HOME to 741741
                    <br />• Emergency Services: 911
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-4">
                <Button onClick={resetAssessment} variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                  Take Another Assessment
                </Button>
                <Button onClick={onBack} className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const assessment = assessments[selectedAssessment];
  const question = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={resetAssessment} className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </div>
            </div>
            <CardTitle className="text-center mb-4 text-white">{assessment.name}</CardTitle>
            <Progress value={progress} className="h-2 bg-gray-700" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-6 text-gray-300">
                Over the last 2 weeks, how often have you been bothered by:
              </h3>
              <p className="text-xl text-white mb-8 font-medium">{question.text}</p>
            </div>

            <RadioGroup
              value={answers[question.id]?.toString() || ""}
              onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700 hover:border-gray-600">
                  <RadioGroupItem value={option.value.toString()} id={option.value.toString()} className="border-gray-600" />
                  <Label htmlFor={option.value.toString()} className="flex-1 cursor-pointer text-gray-200">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={answers[question.id] === undefined}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {currentQuestion === assessment.questions.length - 1 ? "Get Results" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthScreening;
