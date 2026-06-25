---
title: "Next Auth Kit"
category: "Tools"
date: "2025-09-10"
tags: [nextjs, authentication, typescript, library]
role: "Creator & Maintainer"
github: "https://github.com/elhaibahamza/next-auth-kit"
status: "completed"
featured: false
description: "A drop-in authentication kit for Next.js with multi-provider support and session management."
---

## Overview

Next Auth Kit is an open-source library that simplifies adding authentication to Next.js applications. It wraps multiple auth providers behind a consistent API and handles session management, token refresh, and protected routes out of the box.

## Why I Built It

Every Next.js project I started needed authentication. Each time, I'd write the same boilerplate. This kit is the extraction of those patterns into a reusable library.

## Features

- Multi-provider (Google, GitHub, Email, Magic Link)
- Automatic token refresh
- Type-safe session API
- Middleware-based route protection
- Prisma and Drizzle adapters

## Usage

```bash
bun add next-auth-kit
```

Then wrap your app:

```tsx
import { AuthProvider } from "next-auth-kit";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```
