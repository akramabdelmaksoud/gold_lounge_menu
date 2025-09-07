import "./globals.css"; // ensure Tailwind loads


export const metadata = {
title: "Gold Lounge — Digital Menu",
description: "Luxury showcase menu with EN/AR toggle and section heroes.",
  icons: {
    icon: "/logo.jpg",        // path inside /public
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};


export default function RootLayout({ children }) {
return (
<html lang="en">
<body className="min-h-screen antialiased">{children}</body>
</html>
);
}