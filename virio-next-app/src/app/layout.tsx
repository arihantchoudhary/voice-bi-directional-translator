import type { Metadata } from "next";
// Keep only Inter font
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  // Include various weights if needed by the design
  // weight: ["300", "400", "500", "600", "700"],
});

// Remove Playfair Display font configuration

export const metadata: Metadata = {
  title: "Virio AI", // Simplified title
  description: "AI-Native Content Personalization", // Simplified description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`root ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
