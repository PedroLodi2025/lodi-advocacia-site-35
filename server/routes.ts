import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertUserSchema, insertArticleSchema, type User } from "@shared/schema";
import { z } from "zod";
import { fromError } from "zod-validation-error";

// Extend session data
declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup file upload directory
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Setup JSON parsing middleware BEFORE session
  app.use(express.json());

  // Configure multer for file uploads with enhanced error handling
  const upload = multer({
    storage: multer.diskStorage({
      destination: uploadsDir,
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'article-' + uniqueSuffix + path.extname(file.originalname));
      }
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        const error = new Error('Apenas arquivos de imagem são permitidos');
        cb(error);
      }
    },
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB limit
    }
  });

  // Setup session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-for-dev',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Auth middleware
  const requireAuth = (req: Request, res: Response, next: Function) => {
    console.log('Auth check - Session ID:', req.sessionID);
    console.log('Auth check - Session user:', req.session.user ? 'Exists' : 'Not found');
    if (!req.session.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/signin", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      console.log(`Login attempt for email: ${email}`);
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // First check if user exists
      const existingUser = await storage.getUserByEmail(email);
      console.log(`User found: ${existingUser ? 'Yes' : 'No'}`);
      
      const user = await storage.authenticateUser(email, password);
      console.log(`Authentication result: ${user ? 'Success' : 'Failed'}`);
      
      if (!user) {
        return res.status(401).json({ error: "Área Exclusiva para Administradores do Sistema" });
      }

      req.session.user = user;
      console.log('Session saved - Session ID:', req.sessionID);
      console.log('Session saved - User:', user.email);
      res.json({ user: { id: user.id, email: user.email, username: user.username, role: user.role } });
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  // Signup route disabled - admin-only access
  app.post("/api/auth/signup", (req: Request, res: Response) => {
    res.status(403).json({ error: "Área Exclusiva para Administradores do Sistema" });
  });

  app.post("/api/auth/signout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ message: "Signed out successfully" });
    });
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (req.session.user) {
      const { password, ...userWithoutPassword } = req.session.user;
      res.json({ user: userWithoutPassword });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  // Article routes
  app.get("/api/articles", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const articles = await storage.getArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req: Request, res: Response) => {
    try {
      const article = await storage.getArticleById(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", requireAuth, upload.single('image'), async (req: Request, res: Response) => {
    try {
      console.log('Request body:', req.body);
      console.log('File:', req.file);

      // Validate required fields
      if (!req.body.title || !req.body.description || !req.body.category) {
        return res.status(400).json({ error: 'Título, descrição e categoria são obrigatórios' });
      }

      const articleData = {
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        category: req.body.category,
        button_text: req.body.button_text?.trim() || 'Saiba mais',
        url: req.body.url?.trim() || '',
        user_id: req.session.user!.id,
        image_url: req.file ? `/uploads/${req.file.filename}` : null
      };

      const validatedData = insertArticleSchema.parse(articleData);
      
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      console.error('Article creation error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      res.status(500).json({ error: "Falha ao criar artigo" });
    }
  });

  app.put("/api/articles/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const updateData = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(req.params.id, updateData);
      
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      res.status(500).json({ error: "Failed to update article" });
    }
  });

  app.delete("/api/articles/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteArticle(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  // Users/profiles route for admin
  app.get("/api/users", requireAuth, async (req: Request, res: Response) => {
    try {
      // This is a simplified implementation - in a real app you'd want pagination
      // For now, just return empty array since we don't have a way to list all users
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
