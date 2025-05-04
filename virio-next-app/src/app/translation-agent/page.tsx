"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner"; // Assuming sonner is installed or will be
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Phone, Globe, Mic, Volume2, Settings, Languages, Save } from "lucide-react"; // Assuming lucide-react is installed

// Define the expected structure of the API response
interface TranslationResponse {
  originalLanguage: string;
  preferredLanguage: string;
  translatedInput: string | null;
  responseInPreferredLanguage: string;
  responseInCallerLanguage: string;
  audioResponse: string;
  error?: string; // Optional error field
  details?: string; // Optional details field
}

export default function TranslationAgentPage() {
  const [input, setInput] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TranslationResponse | null>(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [autoAnswer, setAutoAnswer] = useState(true);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ru", name: "Russian" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "pt", name: "Portuguese" },
  ];

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim()) {
      toast.warning("Please enter a message", {
        closeButton: true,
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setResponse(null); // Clear previous response
    try {
      const apiResponse = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data: TranslationResponse = await apiResponse.json();

      // Check for errors in the response body or status code
      if (!apiResponse.ok || data.error) {
        const errorMessage = data.error || `Error: ${apiResponse.status}`;
        const errorDetails = data.details ? ` Details: ${data.details}` : '';
        throw new Error(`${errorMessage}${errorDetails}`);
      }

      setResponse(data);
      toast.success("Translation completed", {
        closeButton: true,
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error processing translation:", error);
      toast.error(error.message || "Failed to process translation", {
        closeButton: true,
        duration: Infinity, // Keep error visible until dismissed
      });
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = () => {
    // This would typically save to the backend/memory
    // For now, just show a toast notification
    toast.success("Preferences saved (simulated)", {
      description: `Your preferred language is now set to ${languages.find(l => l.code === preferredLanguage)?.name}`,
      closeButton: true,
      duration: 3000,
    });
    // Here you would trigger the memory update process (e.g., call another API endpoint)
    // Remember the memory initialization step needs to be done separately.
  };

  const handleCall = () => {
    if (!phoneNumber.trim()) {
      toast.warning("Please enter a phone number", {
        closeButton: true,
        duration: 3000,
      });
      return;
    }
    
    toast.info("Initiating call (simulated)...", {
      description: `Calling ${phoneNumber}. This feature requires Twilio integration.`,
      closeButton: true,
      duration: 5000,
    });
    // Actual call initiation would happen here using Twilio SDK or API
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-card border-border shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Translation Voice Agent</h1>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setActiveTab(activeTab === "settings" ? "chat" : "settings")}
              aria-label={activeTab === "settings" ? "Go to Chat" : "Go to Settings"}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="mb-4">
                    <Label htmlFor="phoneNumber">Phone Number (for Twilio Integration)</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        aria-label="Phone Number"
                      />
                      <Button onClick={handleCall} disabled={isLoading}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                     <p className="text-xs text-muted-foreground mt-1">Enter a number to simulate calling via Twilio.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="message">Your Message</Label>
                      <div className="flex gap-2 mt-1">
                        <Textarea
                          id="message"
                          placeholder="Type your message here..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="min-h-[100px]"
                          aria-label="Message Input"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                       <Button type="button" variant="outline" disabled={true}> {/* Disabled for now */}
                        <Mic className="h-4 w-4 mr-2" />
                        Record Voice
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Translating..." : "Translate & Respond"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              {isLoading && <p>Loading...</p>}

              {response && !isLoading && (
                <Card className="p-4 bg-muted/50 border">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Detected Language: <span className="font-medium text-foreground">{languages.find(l => l.code === response.originalLanguage)?.name || response.originalLanguage}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your Preferred Language: <span className="font-medium text-foreground">{languages.find(l => l.code === response.preferredLanguage)?.name || response.preferredLanguage}</span>
                      </p>
                    </div>
                    
                    <Separator />
                    
                    {response.translatedInput && (
                      <div>
                        <h3 className="text-sm font-medium mb-1 text-muted-foreground">Input Translated for Agent:</h3>
                        <p className="p-2 bg-secondary/30 rounded-md text-sm">{response.translatedInput}</p>
                      </div>
                    )}
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Agent's Response (in Caller's Language):</h3>
                         <Button variant="ghost" size="sm" disabled={true}> {/* Disabled for now */}
                          <Volume2 className="h-4 w-4 mr-1" />
                          Play
                        </Button>
                      </div>
                      <p className="p-2 bg-primary/10 rounded-md text-sm">{response.audioResponse}</p>
                    </div>
                    
                    {response.responseInPreferredLanguage !== response.responseInCallerLanguage && (
                      <>
                        <Separator />
                        <div className="grid grid-cols-1 gap-4">
                           <div>
                            <h3 className="text-sm font-medium mb-1 text-muted-foreground">Agent's Response (in Your Language):</h3>
                            <p className="p-2 bg-secondary/30 rounded-md text-sm">{response.responseInPreferredLanguage}</p>
                          </div>
                          {/* Removed the duplicate display of caller's language response */}
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Language Preferences</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredLanguage">Your Preferred Language</Label>
                      <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                        <SelectTrigger id="preferredLanguage" aria-label="Select Preferred Language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                       <p className="text-xs text-muted-foreground">This language will be used for agent responses shown to you.</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Call Settings (Simulated)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoAnswer" className="cursor-pointer">Auto-Answer Calls</Label>
                        <p className="text-sm text-muted-foreground">
                          Simulate automatically answering incoming calls.
                        </p>
                      </div>
                      <Switch
                        id="autoAnswer"
                        checked={autoAnswer}
                        onCheckedChange={setAutoAnswer}
                        aria-label="Toggle Auto Answer Calls"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={savePreferences} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences (Simulated)
                </Button>
                 <p className="text-xs text-muted-foreground text-center">Note: Saving preferences requires backend implementation to update Langbase memory.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
