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
- **2025-08-11**: Updated statistics display
  - Changed "10+" to "+20 Anos" in Hero section
  - Changed "500+" to "Inúmeros Casos" in Hero section  
  - Changed "10+" to "20+" in Experience section
  - Changed "500+" to "Inúmeros" in Experience section
  - Changed "95%" to "Alta" in Experience section
- **2025-08-11**: Restricted admin access
  - Removed signup functionality from admin login
  - Disabled user registration - admin-only access
  - Updated error message to "Área Exclusiva para Administradores do Sistema"
  - Maintained existing user accounts in database
- **2025-08-11**: Added image upload functionality
  - Articles now support image attachments from local computer
  - Added multer for file upload handling
  - Images stored in /public/uploads directory
  - Added image preview in admin panel
  - Images displayed in article listings

## Next Steps
- Test admin login and image upload functionality
- Project ready for deployment after testing
- Consider GitHub integration for version control