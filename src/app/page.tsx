"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getAiResult } from "@/apiai/aiserve";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAiAnalysisSubmit = async () => {
    // Show analyzing state
    setIsAnalyzing(true);
    setAnalysisResult("Analyzing your image...");

    if (!file) {
      setAnalysisResult("Please upload an image file before analyzing.");
      setIsAnalyzing(false);
      return;
    }

    // Moved AI call here, after validation and setting initial analyzing state
    const description = await getAiResult(prompt, file);
    console.log(description);
    setAnalysisResult(description); // Directly set the result from AI
    setIsAnalyzing(false); // Set analyzing to false after getting the result
    
    // Actual OpenAI SDK implementation would look something like:
    /*
    try {
      // const response = await yourOpenAiSdkFunction(file, prompt);
      // setAnalysisResult(response.text);
      // setIsAnalyzing(false);
    } catch (error) {
      console.error("Error submitting to AI:", error);
      setAnalysisResult("Failed to analyze image. Please try again.");
      setIsAnalyzing(false);
    }
    */
  };
  //End AI Analysis

  // Hydration error mismatch safety feature between server and client
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by not rendering theme-dependent UI on the server
    // You can return a placeholder or null here if needed.
    // For this page, returning null might be too disruptive if the button is essential for layout.
    // A simple placeholder button or the button itself without theme-specific text could be an alternative.
    // However, to ensure no hydration errors, returning null or a minimal placeholder is safest.
    return (
      // Return a basic structure to avoid layout shifts if possible, or null
      <div className="container mx-auto py-10 space-y-8">
        <header className="flex justify-between items-center">
          <Image
            src="/chipsxp-research-logo-webp-512.webp" // Default, no conditional invert
            alt="ChipsXP Logo"
            width={150}
            height={150}
            priority
          />
        </header>
        {/* Potentially a loading state for the main content as well */}
      </div>
    );
  }
  //End Hydration safety Features

  //Toggle theme button between light and dark design
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  //End toggle theme
  
  //Page return of the application
  return (
    <div className="container mx-auto py-10 space-y-8">
      <header className="flex justify-between items-center">
        <Image
          className={theme === "dark" ? "invert" : ""}
          src="/chipsxp-research-logo-webp-512.webp" // Default, no conditional invert
          alt="ChipsXP Logo"
          width={150}
          height={150}
          priority
        />
        <Button variant="outline" onClick={toggleTheme}>
          Toggle Theme ({theme === "dark" ? "Light" : "Dark"})
        </Button>
      </header>

      <main className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              AI Image Analyzer & Inspector
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Ask the AI about your images, you&apos;ll be amazed what
              you&apos;re missing.
            </p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Features:</h2>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Drag and drop file upload</li>
                <li>Select a file from File Explorer</li>
                <li>File type validation</li>
                <li>Upload your image with progress indicator</li>
                <li>Ask your question about the image </li>
                <li>AI will answer your question</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div>
          <FileUpload
            value={file}
            onChange={setFile}
            title="Upload Image"
            description="Drop an image file here or click to browse"
            allowedTypes={["jpg", "jpeg", "png", "gif", "webp"]}
            maxSize={5}
          />
          <Label className="md:col-start-2 mt-4">Ask Your Question Below</Label>

          {file && prompt.trim() && (
            <Button
              onClick={handleAiAnalysisSubmit}
              className="w-full mt-2 h-12"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="h-8 size-8 animate-spin"></Loader2>
              ) : (
                "Analyze Image with AI"
              )}
            </Button>
          )}
        </div>

        <Textarea
          rows={5}
          className="md:col-start-2 md:row-start-2"
          placeholder="Textbox: Enter your question for image here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Card className="md:col-start-1 md:row-start-2">
          <CardHeader>
            <CardTitle>Image Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResult ? (
              <div
                className={`prose ${
                  isAnalyzing ? "animate-pulse text-muted-foreground" : ""
                }`}
              >
                <ReactMarkdown>{analysisResult}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                The AI&apos;s findings about the uploaded image will be
                displayed here.
              </p>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="border-t pt-6 text-center text-sm text-muted-foreground">
        <p>Built with Next.js and shadcn/ui</p>
      </footer>
    </div>
  );
}
