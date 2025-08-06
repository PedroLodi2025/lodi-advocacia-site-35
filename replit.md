# Lodi Advocacia - Legal Website Project

## Project Overview
This is a legal website for Lodi Advocacia, a Portuguese law firm. The project has been successfully migrated from Lovable to Replit with modern architecture and security practices.

## Architecture
- **Frontend**: React + TypeScript with Wouter for routing
- **Backend**: Express.js with session-based authentication
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + Shadcn/UI components

## Key Features
- Public-facing legal website with articles and contact information
- Admin panel for managing articles and user accounts
- Session-based authentication system
- Responsive design with dark mode support

## Database Schema
- **Users**: Authentication and user management
- **Articles**: Legal articles with categories, descriptions, and URLs
- Categories: Direito Civil, Direito Bancário, Direito do Trabalho, Direito de Família, Direito do Consumidor, Direito Empresarial

## API Endpoints
- `/api/auth/*` - Authentication (signin, signup, signout, me)
- `/api/articles` - CRUD operations for articles
- `/api/users` - User management (admin only)

## Migration Notes
- Successfully migrated from Supabase to PostgreSQL with Drizzle
- Replaced React Router with Wouter for better compatibility
- Implemented secure server-side authentication
- All client-side database calls moved to server routes

## Recent Changes
- **2025-08-06**: Completed migration from Lovable to Replit
- Removed all Supabase dependencies
- Implemented session-based authentication
- Database schema pushed and working
- All components updated to use new API routes

## Next Steps
- Project ready for deployment
- Consider adding more admin features if needed
- Monitor for any performance optimizations