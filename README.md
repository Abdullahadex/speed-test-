# Speed Typing Test App

A mobile-optimized typing speed test application built with Next.js, React, and TypeScript.

## Features

- 🚀 **Mobile-First Design** - Optimized for mobile keyboards and touch interfaces
- 🎯 **Real-time WPM Tracking** - Calculate words per minute as you type
- 📊 **Accuracy Measurement** - Track typing accuracy with character-by-character comparison
- 🎲 **Random Text Generation** - Dynamic content for varied typing challenges
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **PWA Ready** - Installable as a mobile app
- ♿ **Accessibility** - Screen reader support and keyboard navigation

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React 19** - Latest React features

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd speedapp
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Build

```bash
npm run build
npm start
```

### Troubleshooting 404 Errors

If you're getting 404 errors when deployed:

1. **Check build output**:

```bash
npm run build
```

2. **Verify all files exist**:

   - Ensure `app/page.tsx` exists
   - Check that `app/layout.tsx` is present
   - Verify `public/manifest.json` is valid

3. **Clear cache and rebuild**:

```bash
rm -rf .next
npm run build
```

4. **Check deployment platform settings**:
   - Ensure Node.js version is 18+
   - Verify build command is `npm run build`
   - Check that output directory is `.next`

## Mobile Keyboard Optimizations

- **16px font size** prevents iOS zoom
- **Touch-friendly buttons** (48px minimum)
- **Keyboard detection** with dynamic layout
- **Safe area support** for notched devices
- **Orientation handling** for landscape/portrait

## Usage

1. Click "Start Test" to begin
2. Type the displayed text exactly
3. View your WPM and accuracy results
4. Click "New Text" for a different challenge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
