import type { Metadata } from "next";
import {  Mona_Sans } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EhudAI - Creative AI Studio",
  description: "AI-powered creative studio specializing in films, advertising, and documentaries",
  openGraph: {
    title: "EhudAI - Creative AI Studio",
    description: "AI-powered creative studio specializing in films, advertising, and documentaries",
    // images: [{
    //   url: '/ogImage.png',
    //   width: 1200,
    //   height: 630,
    //   alt: 'EhudAI Creative Studio'
    // }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} antialiased bg-white`}>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
