import { db } from "./db";
import { eq } from "drizzle-orm";
import { 
  messages, 
  users, 
  feedbacks, 
  type User, 
  type InsertUser, 
  type Message, 
  type InsertMessage, 
  type Feedback, 
  type InsertFeedback 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySessionId(sessionId: string): Promise<Message[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getMessagesBySessionId(sessionId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.sessionId, sessionId))
      .orderBy(messages.timestamp);
  }
  
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [feedback] = await db
      .insert(feedbacks)
      .values(insertFeedback)
      .returning();
    return feedback;
  }
}

export const storage = new DatabaseStorage();
