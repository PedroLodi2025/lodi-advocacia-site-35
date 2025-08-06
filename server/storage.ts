import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, desc } from "drizzle-orm";
import { users, articles, type User, type Article, type InsertUser, type InsertArticle } from "@shared/schema";
import bcrypt from "bcrypt";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(email: string, password: string): Promise<User | null>;
  
  // Article methods
  getArticles(limit?: number): Promise<Article[]>;
  getArticleById(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 12);
    const result = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
    }).returning();
    return result[0];
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword ? user : null;
  }

  async getArticles(limit?: number): Promise<Article[]> {
    if (limit) {
      return await db.select().from(articles).orderBy(desc(articles.created_at)).limit(limit);
    }
    return await db.select().from(articles).orderBy(desc(articles.created_at));
  }

  async getArticleById(id: string): Promise<Article | undefined> {
    const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
    return result[0];
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const result = await db.insert(articles).values(article).returning();
    return result[0];
  }

  async updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const result = await db.update(articles)
      .set({ ...article, updated_at: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return result[0];
  }

  async deleteArticle(id: string): Promise<boolean> {
    const result = await db.delete(articles).where(eq(articles.id, id));
    return result.rowCount > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private articles: Map<string, Article> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 12);
    const user: User = { 
      ...insertUser, 
      password: hashedPassword,
      role: insertUser.role || "user",
      id: crypto.randomUUID(),
      created_at: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword ? user : null;
  }

  async getArticles(limit?: number): Promise<Article[]> {
    const allArticles = Array.from(this.articles.values())
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return limit ? allArticles.slice(0, limit) : allArticles;
  }

  async getArticleById(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const article: Article = {
      ...insertArticle,
      date: insertArticle.date || new Date().toISOString().split('T')[0],
      button_text: insertArticle.button_text || "Saiba mais",
      url: insertArticle.url || null,
      id: crypto.randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.articles.set(article.id, article);
    return article;
  }

  async updateArticle(id: string, updateData: Partial<InsertArticle>): Promise<Article | undefined> {
    const existing = this.articles.get(id);
    if (!existing) return undefined;
    
    const updated: Article = { 
      ...existing, 
      ...updateData, 
      updated_at: new Date() 
    };
    this.articles.set(id, updated);
    return updated;
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }
}

export const storage = new MemStorage();
