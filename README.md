# EduLink - Indian Student Community App

**Default Users:**
- **Student**: Janhavi Sharma (B.Tech Computer Science, 3rd Year, DTU Delhi)
- **Super Admin**: Tanisha (System Administrator) - Username: `admin`, Password: `admin123`
- **Tutor**: Kalyani Mehta (B.Tech Mathematics, 4th Year, IIT Bombay)

## 🚀 Features

### 📱 Mobile & Web Responsive
- **Mobile-first design** optimized for Indian students
- **Web responsive** - works perfectly on desktop browsers
- **Progressive Web App** capabilities
- **Cross-platform compatibility**

### 🗄️ Database Integration
- **Supabase Backend** - Real-time database
- **User Authentication** - Secure login/signup
- **Real-time Chat** - Instant messaging between students and tutors
- **Payment Tracking** - Transaction history and wallet management
- **Post Management** - Create, read, update study requests and offers

### 🎯 Core Features
- **Peer Tutoring** - Students help students
- **Study Notes Sharing** - Upload and download study materials
- **Group Study** - Collaborative learning sessions
- **Payment Integration** - UPI and card payments
- **Rating System** - Review and rate tutors/students
- **Achievement System** - Gamified learning experience

### 🔒 Super Admin Panel
- **Complete System Management** - Full control over all app components
- **User Management** - Create, edit, delete, block/unblock users
- **Content Management** - Manage posts, messages, and user-generated content
- **System Settings** - Configure app settings and parameters
- **Analytics Dashboard** - Real-time statistics and user engagement metrics
- **Security Monitoring** - Access logs, failed login attempts, security alerts
- **Database Management** - Backup, restore, and database operations
- **Audit Trail** - Complete logging of all administrative actions
- **Role-based Access** - Multi-level permission system
- **Session Management** - Secure admin authentication with timeouts

## Setup Instructions for VS Code

1. Create a new folder on your computer called `edulink-app`
2. Open VS Code and open this folder
3. Create the following files with their respective content:

## Project Structure
```
edulink-app/
├── package.json
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── supabase/
│   └── migrations/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   └── components/
│       ├── SplashScreen.tsx
│       ├── LoginScreen.tsx
│       ├── HomeScreen.tsx
│       ├── SearchScreen.tsx
│       ├── UploadScreen.tsx
│       ├── ChatScreen.tsx
│       ├── ProfileScreen.tsx
│       ├── PaymentScreen.tsx
│       └── BottomNavigation.tsx
```


## Installation Commands
After creating all files, run these commands in VS Code terminal:

```bash
npm install
npm run dev
```

## Database Setup (Optional)
To connect with Supabase database:

1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key
3. Update `src/lib/supabase.ts` with your credentials
4. Run the migration file in Supabase SQL editor
5. Enable Row Level Security policies

## Features
- Modern mobile-first design
- Indian student community focused
- Complete UI for academic collaboration
- Payment integration with ₹ and UPI
- Real-time chat interface
- Profile and verification system

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- Supabase (Database & Auth)
- Advanced Admin Panel System
- Role-based Access Control
- Comprehensive Audit Logging

## Web Responsive
- **Mobile**: 320px - 767px (Primary focus)
- **Tablet**: 768px - 1023px (Responsive design)
- **Desktop**: 1024px+ (Web-optimized layout)
- **4K**: 1280px+ (Enhanced experience)

Perfect for both mobile usage and web browsing! 🌐📱