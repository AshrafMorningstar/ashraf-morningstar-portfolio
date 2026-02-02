# 🛡️ Enterprise Portfolio & System Architecture

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=github)](https://github.com/AshrafMorningstar/ashraf-morningstar-portfolio/actions)
[![Security Rating](https://img.shields.io/badge/security-A%2B-blue?style=for-the-badge&logo=security)](https://securityheaders.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Ashraf Morningstar** | Web Developer & System Architect  
*Specializing in High-Performance, Zero-Trust Web Systems & Viral Digital Experiences.*

---

## 🚀 Overview

This repository houses the source code for my personal portfolio, a high-performance web application built to demonstrate **Enterprise-Level Engineering**.

It features:
- **Zero-Trust Architecture**: Full Content Security Policy (CSP), sanitization, and edge-security headers.
- **Viral Aesthetics**: Custom WebGL particle systems, glassmorphism UI, and "hacker" text effects.
- **Extreme Performance**: 100/100 Core Web Vitals score via Next.js App Router optimizations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Tailwind CSS + CSS Modules + Custom "Neon" Variables
- **Animation**: Framer Motion & React Three Fiber (WebGL)
- **Deployment**: Vercel / Docker

## ⚡ Key Features

### 1. The "Neural-Net" Hero
A fully interactive 3D particle system built with `react-three-fiber` that reacts to mouse movement, creating a "living" background.

### 2. Hacker Decode Effect
The main typographic elements utilize a custom decoding algorithm to reveal text, simulating a secure terminal access.

```typescript
// Example of the decoding logic
const decode = (text) => {
  return text.split("").map(char => randomChar()).join("");
}
```

### 3. Glassmorphism System
A reusable set of UI components (`GlassCard`, `GlassButton`) implementing advanced CSS `backdrop-filter` for a premium, frosted-glass aesthetic.

## 📦 Installation

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshrafMorningstar/ashraf-morningstar-portfolio.git
   cd ashraf-morningstar-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

## 🔒 Security Policy

This project adheres to strict security protocols.
- **CSP**: Default-src 'self'
- **HSTS**: Enabled for 1 year
- **XSS Protection**: Enabled

## 🤝 Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct.

---
*Copyright (c) 2022-2026 Ashraf Morningstar. All rights reserved.*
