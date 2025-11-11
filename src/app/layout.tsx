import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Deyby Santiago Argoty Gallardo",
  description: "Invitación de entrega de batas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Precarga asíncrona de Playfair Display (u otra fuente serif)
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    fontLink.media = "print"; // carga en background
    fontLink.onload = () => {
      fontLink.media = "all"; // activa cuando está lista
    };

    document.head.appendChild(fontLink);

    // Limpieza al desmontar
    return () => {
      if (document.head.contains(fontLink)) {
        document.head.removeChild(fontLink);
      }
    };
  }, []);

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}