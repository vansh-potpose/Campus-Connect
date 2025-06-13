import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Providers from "./provider";

// Existing Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ New: Add Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Campus Connect - Student Complaint & Experience Platform",
  description:
    "A comprehensive platform for students to share complaints and interview experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-gradient-to-br from-blue-50 via-white to-purple-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
