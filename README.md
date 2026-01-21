# Open Source Portfolio Template

A modern, animated portfolio template that automatically generates from your [Reactive Resume (rxresu.me)](https://rxresu.me) CV data. Built with React, Tailwind CSS, and TypeScript.

![Portfolio Preview](https://jfredyromero.github.io/portfolio/)

## ✨ Features

-   **Dynamic Data Loading**: Fetches your CV data directly from rxresu.me API
-   **Light/Dark Mode**: Toggle between themes with professional transitions
-   **Responsive Design**: Looks great on mobile, tablet, and desktop
-   **Section Support**: Experience, Projects, Skills, Education, Awards, Languages, and References
-   **Easy Deployment**: Deploy to GitHub Pages with zero configuration

## 🚀 Quick Start

### Prerequisites

-   A CV on [rxresu.me](https://rxresu.me)
-   An API key from rxresu.me (Settings → API Keys)
-   Node.js 18+ installed
-   A GitHub account

### Step 1: Fork the Repository

1. Click the **Fork** button at the top right of this repository
2. This creates a copy in your GitHub account

### Step 2: Get Your Resume URL and API Key

1. Go to [rxresu.me](https://rxresu.me) and log in
2. Open your resume and copy the URL (e.g., `https://rxresu.me/username/my-resume`)
3. Go to **Settings** → **API Keys**
4. Click **Create New API Key** and copy it

### Step 3: Configure GitHub Secrets

1. In your forked repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:
    - **Name**: `PUBLIC_RESUME_PUBLIC_URL`
    - **Value**: Your rxresu.me URL (e.g., `https://rxresu.me/username/my-resume`)
3. Click **New repository secret** again and add:
    - **Name**: `PUBLIC_RXRESUME_API_KEY`
    - **Value**: Your API key from rxresu.me

### Step 4: Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy your portfolio

### Step 5: Trigger a Deployment

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Click **Re-run all jobs** (or push a commit to trigger automatically)

### Step 6: Access Your Portfolio

Your portfolio will be available at:

```
https://YOUR_USERNAME.github.io/portfolio/
```

## 🛠️ Local Development

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create a .env file with your resume URL and API key
echo "PUBLIC_RESUME_PUBLIC_URL=https://rxresu.me/your-username/your-resume" > .env
echo "PUBLIC_RXRESUME_API_KEY=your-api-key-here" >> .env

# Start the development server
npm run dev
```

## 📁 Project Structure

```
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript type definitions
│   └── index.css        # Global styles and CSS variables
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind CSS configuration
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
	--accent: 280 100% 65%; /* Purple accent color */
	--background: 0 0% 3%; /* Dark background */
	/* ... */
}

.light {
	--accent: 280 100% 55%; /* Purple accent for light mode */
	--background: 0 0% 98%; /* Light background */
	/* ... */
}
```

### Modifying Animations

Edit the keyframes in `tailwind.config.ts`:

```ts
keyframes: {
  "float-rotate-1": {
    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
    "50%": { transform: "translateY(-20px) rotate(5deg)" },
  },
  // ...
}
```

## 🔧 Environment Variables

| Variable                   | Description               | Required |
| -------------------------- | ------------------------- | -------- |
| `PUBLIC_RESUME_PUBLIC_URL` | Your rxresu.me public URL | Yes      |
| `PUBLIC_RXRESUME_API_KEY`  | Your rxresu.me API key    | Yes      |

## 🌐 How It Works

This portfolio fetches data from the rxresu.me OpenAPI. Since browsers block cross-origin requests (CORS), the app uses a CORS proxy ([corsproxy.io](https://corsproxy.io)) to fetch data from static hosting like GitHub Pages.

**API Flow:**

1. Your public URL is transformed to the API endpoint
2. The app fetches the data through the CORS proxy
3. Data is parsed and rendered in the portfolio

## 🔒 Security Note

-   In local development, credentials are stored in `.env` (not committed to git)
-   In GitHub Pages, credentials are stored as repository secrets

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

-   Built with [Vite](https://vitejs.dev/) + [React](https://react.dev/)
-   Styled with [Tailwind CSS](https://tailwindcss.com/)
-   UI Components from [shadcn/ui](https://ui.shadcn.com/)
-   Icons from [Lucide React](https://lucide.dev/)
-   CV Data powered by [Reactive Resume](https://rxresu.me)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/jfredyromero/portfolio/issues).

---

Made with ❤️ by the open source community
