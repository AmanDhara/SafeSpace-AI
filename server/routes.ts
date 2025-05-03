import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { detectLanguage } from "./lib/languageDetect";
import { generateAIResponse } from "./lib/openai";
import { v4 as uuidv4 } from "uuid";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for chat
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request
      const result = chatRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          message: "Invalid request",
          error: result.error.format()
        });
      }
      
      const { message, language, sessionId } = result.data;
      
      // Detect language if not provided
      const detectedLanguage = language || await detectLanguage(message);
      
      // Store user message
      await storage.createMessage({
        content: message,
        isUserMessage: true,
        language: detectedLanguage,
        sessionId,
        timestamp: new Date().toISOString()
      });
      
      // Generate AI response
      const aiResponse = await generateAIResponse(message, sessionId, detectedLanguage);
      
      // Store bot response
      await storage.createMessage({
        content: aiResponse,
        isUserMessage: false,
        language: detectedLanguage,
        sessionId,
        timestamp: new Date().toISOString()
      });
      
      // Return response
      return res.status(200).json({
        message: aiResponse,
        language: detectedLanguage,
        detectedLanguage
      });
    } catch (error) {
      console.error('Chat API error:', error);
      return res.status(500).json({
        message: "Failed to process your message",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // API route to get chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return res.status(400).json({
          message: "Session ID is required"
        });
      }
      
      const messages = await storage.getMessagesBySessionId(sessionId);
      
      return res.status(200).json({ messages });
    } catch (error) {
      console.error('Get chat history error:', error);
      return res.status(500).json({
        message: "Failed to get chat history",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // API route to generate session ID
  app.get("/api/session", (req, res) => {
    const sessionId = uuidv4();
    return res.status(200).json({ sessionId });
  });

  const httpServer = createServer(app);

  return httpServer;
}
