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
- **2025-08-13**: **MAJOR UPDATE** - Successfully converted to static site for Hostinger hosting
  - Removed all Node.js/Express backend dependencies
  - Implemented Firebase Authentication for admin login
  - Migrated to Firebase Firestore for article storage
  - Created complete static HTML/CSS/JS structure
  - Added comprehensive setup documentation
  - Ready for direct upload to Hostinger hosting
  - Maintained all original functionality (admin panel, articles, authentication)
  - **COMPLETED**: Applied real Firebase configuration values (lodiadvocacia-79fd5)
  - **COMPLETED**: All static files created and ready for deployment
  - **FINAL STATUS**: Migration from Node.js to static site 100% complete
- **2025-08-12**: Successfully migrated from Replit Agent to Replit environment
  - Fixed all TypeScript errors and database connection issues
  - **CRITICAL FIX**: Replaced in-memory storage with PostgreSQL database for data persistence
  - Created PostgreSQL database with proper schema and migrations
  - Articles and user data now persist between server restarts
  - Created admin user: pedro.lodi.adv@gmail.com / ph230570
  - Fixed services menu hover behavior for better usability
  - Fixed AdminPanel hooks error preventing logout functionality
  - Changed "Assistência Online" button to link to chat online (chatvolt.ai/@assistentelodi) instead of WhatsApp
  - Fixed upload de imagens with multipart/form-data middleware configuration
  - Implemented automatic image resize and compression (800x600px, JPEG 80% quality)
  - Created comprehensive .gitignore and README.md files
  - Application now running properly on port 5000
  - **FIXED**: Session-based authentication issues by implementing hybrid token + session system
  - **FIXED**: Image upload and serving functionality with proper MIME types
  - **FIXED**: Image display proportions to prevent cropping in article cards
  - **FIXED**: Data persistence issue - articles now save permanently to PostgreSQL database
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

## Current Status
- ✅ PostgreSQL database configured and working
- ✅ Admin user created and authentication working
- ✅ Data persistence implemented - articles save permanently
- ✅ Image upload functionality working
- ✅ Application ready for production use

## Next Steps
- Project ready for deployment
- Consider GitHub integration for version control
- All core functionality working with persistent data storage