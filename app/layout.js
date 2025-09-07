import "./globals.css"; // ensure Tailwind loads


export const metadata = {
title: "Gold Lounge — Digital Menu",
description: "nothin better than being in gold lounge welocme to your second Home ",
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
