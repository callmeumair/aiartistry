"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

type GenType = "image" | "video" | "design";

export default function GeneratorPage() {
  const [type, setType] = useState<GenType>("image");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setResultUrl(null);
    setError(null);
    try {
      const res = await fetch(`/api/generate/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (res.status === 401) {
        await signIn();
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Generation failed");
      }
      const data = await res.json();
      setResultUrl(data.url as string);
    } catch (err: any) {
      setError(err?.message ?? "Generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Generator</h1>
      <p className="text-muted-foreground">Create AI videos, images, and designs.</p>

      <Tabs value={type} onValueChange={(v) => setType(v as GenType)}>
        <TabsList>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>

        {(["image", "video", "design"] as GenType[]).map((t) => (
          <TabsContent key={t} value={t}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{t} generation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`prompt-${t}`}>Prompt</Label>
                    <Textarea
                      id={`prompt-${t}`}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={`Describe the ${t} you want to generate...`}
                      rows={4}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <Button type="submit" disabled={isLoading || !prompt.trim()}>
                      {isLoading ? "Generating..." : "Generate"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      This will call the {t} API in Step 8.
                    </span>
                  </div>

                  <AnimatePresence>
                    {resultUrl && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                        <Label>Result</Label>
                        {t === "image" ? (
                          <img src={resultUrl} alt="Generated" className="rounded-md border max-w-full h-auto" />
                        ) : (
                          <a href={resultUrl} className="text-primary underline" target="_blank" rel="noreferrer">
                            Open generated {t}
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}


