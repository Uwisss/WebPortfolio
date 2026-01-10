# Carl Luis Portfolio - React SPA

A modern Single Page Application (SPA) portfolio built with React.js, converted from a multi-page HTML/CSS website.

## 🚀 Features

- ⚡ **Single Page Application** - Smooth scrolling between sections
- 🌓 **Dark/Light Theme Toggle** - Switch between themes
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Modern UI** - Clean and professional design
- ✨ **Smooth Animations** - CSS transitions and keyframe animations
- 🖼️ **Image Gallery Modal** - View project screenshots
- 📊 **Animated Skill Bars** - Progress bars animate on scroll

## 📁 Project Structure

```
react-portfolio/
├── public/
│   ├── index.html
│   ├── owes.jpg          # Profile image
│   ├── DimapilisCv.pdf   # Resume
│   └── img/              # All images
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── SocialFloatingBar.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Projects.js
│   │   ├── Quizzes.js
│   │   ├── Certifications.js
│   │   ├── Modal.js
│   │   └── Footer.js
│   ├── styles/
│   │   └── index.css
│   ├── App.js
│   └── index.js
└── package.json
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the react-portfolio folder:
```bash
cd react-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Copy your images to the public folder:
```bash
# Copy the img folder from the original project
cp -r ../img ./public/
# Copy profile image
cp ../img/owes.jpg ./public/
# Copy CV
cp ../img/DimapilisCv.pdf ./public/
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📦 Deployment

### GitHub Pages

1. Install gh-pages:
```bash
npm install gh-pages --save-dev
```

2. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

## 🎨 Customization

### Changing Theme Colors
Edit the CSS variables in `src/styles/index.css`:

```css
:root[data-theme="light"] {
  --primary-color: #1a365d;
  --secondary-color: #4a90e2;
  --accent-color: #f6ad55;
  /* ... */
}

:root[data-theme="dark"] {
  --primary-color: #8e94f2;
  --secondary-color: #b8c0ff;
  --accent-color: #ffd280;
  /* ... */
}
```

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add it to `App.js`
3. Add navigation link in `Header.js`

## 📝 Technologies Used

- React 18
- CSS3 with Custom Properties
- Font Awesome Icons
- Google Fonts (Montserrat)

## 👤 Author

**Carl Luis C. Dimapilis**
- GitHub: [@Uwisss](https://github.com/Uwisss)
- LinkedIn: [Carl Luis Dimapilis](https://www.linkedin.com/in/dimapilis-carl-luis-c-66b63631b/)

## 📄 License

© 2026 Carl Luis C. Dimapilis. All rights reserved.
