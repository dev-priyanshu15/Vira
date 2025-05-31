
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Calendar, Smile, Frown, Meh, Heart, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  energy: number;
  stress: number;
  notes: string;
  timestamp: Date;
}

interface MoodTrackerProps {
  onBack: () => void;
}

const MoodTracker = ({ onBack }: MoodTrackerProps) => {
  const [currentMood, setCurrentMood] = useState(5);
  const [currentEnergy, setCurrentEnergy] = useState(5);
  const [currentStress, setCurrentStress] = useState(5);
  const [notes, setNotes] = useState("");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [view, setView] = useState<"log" | "analytics">("log");

  useEffect(() => {
    const savedEntries = localStorage.getItem('vira-mood-entries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setMoodEntries(parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })));
    }
  }, []);

  const saveMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      mood: currentMood,
      energy: currentEnergy,
      stress: currentStress,
      notes,
      timestamp: new Date()
    };

    const updatedEntries = [newEntry, ...moodEntries];
    setMoodEntries(updatedEntries);
    localStorage.setItem('vira-mood-entries', JSON.stringify(updatedEntries));

    setCurrentMood(5);
    setCurrentEnergy(5);
    setCurrentStress(5);
    setNotes("");
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="h-6 w-6 text-green-500" />;
    if (mood >= 6) return <Meh className="h-6 w-6 text-yellow-500" />;
    return <Frown className="h-6 w-6 text-red-500" />;
  };

  const getMoodLabel = (mood: number) => {
    if (mood >= 8) return "Great";
    if (mood >= 6) return "Good";
    if (mood >= 4) return "Okay";
    return "Struggling";
  };

  const getWeeklyData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString();
    }).reverse();

    return last7Days.map(date => {
      const dayEntries = moodEntries.filter(entry => entry.date === date);
      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length 
        : 0;
      const avgEnergy = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.energy, 0) / dayEntries.length 
        : 0;
      const avgStress = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.stress, 0) / dayEntries.length 
        : 0;

      return {
        date: date.slice(0, 5),
        mood: Number(avgMood.toFixed(1)),
        energy: Number(avgEnergy.toFixed(1)),
        stress: Number(avgStress.toFixed(1))
      };
    });
  };

  const weeklyData = getWeeklyData();
  const averageMood = moodEntries.length > 0 
    ? moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length 
    : 0;

  const getInsight = () => {
    if (moodEntries.length < 3) return "Keep logging your mood to get personalized insights!";
    
    const recentMoods = moodEntries.slice(0, 3).map(e => e.mood);
    const trend = recentMoods[0] - recentMoods[2];
    
    if (trend > 1) return "Your mood has been improving recently! Keep up the positive momentum.";
    if (trend < -1) return "Your mood seems to be declining. Consider reaching out for support or trying some self-care activities.";
    return "Your mood has been relatively stable. That's a good sign of emotional balance!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-purple-500" />
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Mood Tracker
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* View Toggle */}
        <div className="flex space-x-2 mb-6">
          <Button 
            onClick={() => setView("log")}
            variant={view === "log" ? "default" : "outline"}
            className={view === "log" ? "bg-purple-500 hover:bg-purple-600" : ""}
          >
            Log Mood
          </Button>
          <Button 
            onClick={() => setView("analytics")}
            variant={view === "analytics" ? "default" : "outline"}
            className={view === "analytics" ? "bg-purple-500 hover:bg-purple-600" : ""}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>

        {view === "log" ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mood Logging */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span>How are you feeling today?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mood Scale */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Overall Mood: {getMoodLabel(currentMood)} ({currentMood}/10)
                  </label>
                  <div className="flex items-center space-x-2">
                    {getMoodIcon(currentMood)}
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentMood}
                      onChange={(e) => setCurrentMood(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Energy Scale */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Energy Level: {currentEnergy}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEnergy}
                    onChange={(e) => setCurrentEnergy(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Stress Scale */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Stress Level: {currentStress}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentStress}
                    onChange={(e) => setCurrentStress(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What's affecting your mood today?"
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24"
                  />
                </div>

                <Button 
                  onClick={saveMoodEntry}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Save Mood Entry
                </Button>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recent Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {moodEntries.slice(0, 10).map((entry) => (
                    <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{entry.date}</span>
                        {getMoodIcon(entry.mood)}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        <div>Mood: {entry.mood}/10</div>
                        <div>Energy: {entry.energy}/10</div>
                        <div>Stress: {entry.stress}/10</div>
                      </div>
                      {entry.notes && (
                        <p className="text-xs text-gray-500 mt-2">{entry.notes}</p>
                      )}
                    </div>
                  ))}
                  {moodEntries.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No entries yet. Start tracking your mood!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {averageMood.toFixed(1)}
                  </div>
                  <p className="text-gray-600">Average Mood</p>
                  <Badge variant="secondary" className="mt-2">
                    {getMoodLabel(averageMood)}
                  </Badge>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {moodEntries.length}
                  </div>
                  <p className="text-gray-600">Total Entries</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {moodEntries.length > 0 ? Math.max(...moodEntries.map(e => e.mood)) : 0}
                  </div>
                  <p className="text-gray-600">Best Day</p>
                </CardContent>
              </Card>
            </div>

            {/* Insight Card */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Insight</h3>
                    <p className="text-purple-100">{getInsight()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts */}
            {weeklyData.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Weekly Mood Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Energy vs Stress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="energy" fill="#10b981" />
                        <Bar dataKey="stress" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
