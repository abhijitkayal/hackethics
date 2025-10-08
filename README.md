# HackEthics 🔒

A comprehensive cybersecurity education platform offering courses, tools, and resources for ethical hacking and cybersecurity enthusiasts.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Setup](#environment-setup)

## ✨ Features

- 🎓 **Cybersecurity Courses** - Bug bounty, Python programming, and more
- 🔍 **OSINT Tools** - Open Source Intelligence gathering tools
- 🤖 **AI Assistant** - GPT-powered cybersecurity assistant
- 💳 **Payment Integration** - Razorpay payment gateway for course enrollment
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔐 **User Authentication** - Secure login and signup with Clerk

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Bootstrap 5** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Clerk** - Authentication
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Razorpay** - Payment gateway
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.11.0 or higher)
- **npm** (v10.0.0 or higher)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackethics
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

## 🏃 Running the Project

### Start Backend Server

```bash
cd server
npm start
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Run Both Simultaneously

You can run both servers in separate terminal windows/tabs.

## 📁 Project Structure

```
hackethics/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── animation/   # Animation components
│   │   │   ├── contact/     # Contact form
│   │   │   ├── courses/     # Course listings
│   │   │   ├── dashboard/   # User dashboard
│   │   │   ├── features/    # Features section
│   │   │   ├── footer/      # Footer component
│   │   │   ├── gpt/         # AI assistant
│   │   │   ├── hero_section/# Landing page hero
│   │   │   ├── osint/       # OSINT tools
│   │   │   ├── testimonial/ # User testimonials
│   │   │   └── ui/          # UI components (Radix)
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                  # Express backend
│   ├── server.js           # Main server file
│   ├── feature.js          # Feature routes
│   └── package.json
└── README.md
```

## 📜 Available Scripts

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon (if configured)

## ⚙️ Environment Setup

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory (if needed for API keys):

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
VITE_API_URL=http://localhost:5000
```

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**⚠️ Note:** Remember to update the Razorpay credentials in `server.js` to use environment variables instead of hardcoded values for security.

## 🔧 Configuration Notes

### Node.js Version Compatibility

This project uses:
- Vite 5.x (compatible with Node.js 20.11.0+)
- Tailwind CSS 3.x
- React 19.x

If you encounter version issues, ensure your Node.js version is up to date.

### Payment Gateway

The project uses Razorpay for payment processing. Make sure to:
1. Create a Razorpay account
2. Get your API keys from the dashboard
3. Update the credentials in the server configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Some ESLint warnings may appear - these are non-critical

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

Built with ❤️ by the HackEthics Team
