# FireSync Watch Party Hub

A synchronized streaming platform that allows families to watch content together on multiple Fire TV devices with real-time synchronization, chat, and remote control features.

## 🎬 Features

- **Synchronized Playback**: Perfect sync across all connected Fire TV devices
- **Room Management**: Create and join watch parties with unique 6-digit codes
- **Real-time Chat**: Built-in chat system for family communication
- **Remote Control**: Shared remote control through mobile devices
- **Auto-Discovery**: Automatically finds Fire TVs on the same network
- **Cross-Platform**: Fire TV and mobile interfaces

## 🚀 Quick Start

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/githubansh/1025.git

# Step 2: Navigate to the project directory
cd 1025

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🛠️ Technologies

This project is built with:

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn-ui + Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **Mobile**: Capacitor for mobile app builds

## 📱 Usage

1. **Fire TV Interface**: Use for hosting watch parties and managing synchronization
2. **Mobile Interface**: Use for joining parties and controlling playback
3. **Room Creation**: Generate unique codes for family members to join
4. **Synchronization**: All devices automatically sync playback

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
│   ├── firetv/         # Fire TV specific components
│   ├── mobile/         # Mobile specific components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── pages/              # Page components
└── types/              # TypeScript type definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Deployment

This project can be deployed using:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **Firebase Hosting**: Use Firebase CLI
- **Any static hosting service**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Original Lovable Project URL**: https://lovable.dev/projects/980d1627-4461-456d-b2a4-355c6816f6b5
